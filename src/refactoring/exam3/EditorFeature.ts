export type EditorFeature = {
  getContent: () => string;
  setContent: (newContent: string) => void;
  focus: () => void;
};
