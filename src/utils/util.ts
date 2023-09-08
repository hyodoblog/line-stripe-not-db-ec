export const errorConsole = (err: any) => {
  if (err?.originalError?.response?.data) console.error(JSON.stringify(err.originalError.response.data))
  else if (err instanceof Error) console.error(err.message)
  else console.error(err)
}
