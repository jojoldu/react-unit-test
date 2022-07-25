export default function httpApi(httpClient: any) {
  return (url: string, options: object) =>
    httpClient(url, options)
      .then((data: { json: any; }) => data.json)
      .catch((error: any) => console.log(error));
}

