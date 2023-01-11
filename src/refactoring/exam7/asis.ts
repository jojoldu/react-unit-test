export class StudyQueryService {
  private readonly studySearchUri: string;

  constructor(
    private readonly webClientService: WebClientService,
    private readonly configService: ConfigService<Environment>,
    private readonly postQueryRepository: PostQueryRepository,
    private readonly courseQueryService: CourseQueryRepository,
    private readonly reactionQueryService: ReactionQueryRepository,
    private readonly userQueryRepository: UserQueryRepository,
    private readonly tagQueryRepository: PostCommonTagQueryRepository,
    private readonly postCountQueryRepository: PostCountQueryRepository,
  ) {
    const searchApiUrl = this.configService.get('searchApiUrl', '', {
      infer: true,
    });
    this.studySearchUri = `${searchApiUrl}/api/v1/study`;
  }

  async findByCommunity(
    request: CommunityPostRequest,
  ): Promise<[SearchPostResponse, CommunityPostExtraDto]> {
    const searchPostResponse = request.isEmptyKeywordAndTag
      ? await this.findLatest(request)
      : await this.webClientService
        .create()
        .get()
        .uri(request.toRequestUri(this.studySearchUri))
        .retrieve()
        .then((response) => response.toEntity(SearchPostResponse));

    const postIds = searchPostResponse.items.map((item) => item.id);
    const extraDto = await Promise.all([
      this.courseQueryService.findNameByIds(
        searchPostResponse.items.map((item) => item.courseId || 0),
      ),
      this.postQueryRepository.findCreatedAtAndSlugByIds(postIds),
      this.postCountQueryRepository.findByPostIds(postIds),
      request.userId
        ? this.reactionQueryService.findPostReactions(
          searchPostResponse.items.map((item) => item.id),
          request.userId,
        )
        : undefined,
    ]).then(
      ([courses, posts, postCounts, reactions]) =>
        new CommunityPostExtraDto(
          'studies',
          courses,
          posts,
          postCounts,
          request.userId,
          reactions,
        ),
    );

    return [searchPostResponse, extraDto];
  }

  async findByLecture(
    request: LecturePostRequest,
  ): Promise<Slice<LecturePostResponse>> {
    const searchPostResponse = await this.webClientService
      .create()
      .get()
      .uri(request.toRequestUri(this.studySearchUri))
      .retrieve()
      .then((response) => response.toEntity(SearchPostResponse));

    const [writers, postCountDto, reactionDto] = await Promise.all([
      this.userQueryRepository.findWithThumbnail(
        searchPostResponse.items.map((item) => item.writer?.id || 0),
      ),
      this.postCountQueryRepository.findByPostIds(
        searchPostResponse.items.map((item) => item.id),
      ),
      request.userId
        ? this.reactionQueryService.findPostReactions(
          searchPostResponse.items.map((item) => item.id),
          request.userId,
        )
        : undefined,
    ]);

    return new Slice(
      request.sliceSize,
      searchPostResponse.items.map(
        (item) =>
          new LecturePostResponse(item, writers, postCountDto, reactionDto),
      ),
    );
  }

  async findLatest(request: CommunityPostRequest): Promise<SearchPostResponse> {
    const [posts, total] = await this.postQueryRepository.findLatest(
      PostType.STUDY,
      request,
    );
    const postIds = posts.map((post) => post.id);
    const [tagDto, postCountDto] = await Promise.all([
      this.tagQueryRepository.findByPosts(postIds),
      this.postCountQueryRepository.findByPostIds(postIds),
    ]);

    return SearchPostResponse.of(
      posts.map((post) =>
        SearchPostItem.of(
          post,
          postCountDto.getViewCountBy(post.id),
          tagDto.getTags(post.id),
        ),
      ),
      total,
    );
  }
}
