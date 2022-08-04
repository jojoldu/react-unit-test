export default function httpApi(httpClient: any) {
  return (url: string, options: object) =>
    httpClient(url, options)
      .then((data: { json: any }) => data.json)
      // eslint-disable-next-line no-console
      .catch((error: any) => console.log(error));
}
