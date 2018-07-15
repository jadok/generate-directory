import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync
} from 'fs'
import { join } from 'path'

/**
 * Copy the files and folders from the source directory to the destination directory.
 *
 * @param srcDir
 *   source directory
 * @param dstDir
 *   destination directory
 * @param quiet
 *   display files created.
 *
 * @return boolean
 *   True if an error occurred
 *
 * @see https://gist.github.com/rraallvv/7502a566cd358b347c0c81571c526770
 */
const copy = (srcDir: string, dstDir: string, quiet: boolean = true) => {
  const list: any[] = readdirSync(srcDir)
  let src: string
  let dst: string
  let hasError: boolean = false
  list.forEach((file: string) => {
    src = join(srcDir, file)
    dst = join(dstDir, file)
    const stat = statSync(src)
    if (stat && stat.isDirectory()) {
      try {
        mkdirSync(dst)
      }
      catch (e) {
        console.error(`directory already exists: ${dst}`)
        hasError = true
      }
      if (!quiet) {
        console.log(`created ${dst}/`)
      }
      copy(src, dst)
    }
    else {
      try {
        writeFileSync(dst, readFileSync(src))
      }
      catch (e) {
        console.error(`could not copy file: ${dst}`)
        hasError = true
      }
      if (!quiet) {
        console.log(`created ${dst}`)
      }
    }
  })
  return hasError
}

export default copy
