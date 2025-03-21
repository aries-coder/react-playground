export function fileName2Language(
  fileName: string
) {
  const suffix = fileName.split('.').pop() || ''

  switch (suffix) {
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'js':
    case 'jsx':
      return 'javascript'
    default:
      return suffix
  }
}
