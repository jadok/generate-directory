import * as ora from 'ora'
import * as path from 'path'

import * as actions from './utils/copy'


export class GenerateDirectory {
  constructor(srcDir: string, distDir: string) {
    this.copying(srcDir, distDir)
  }

  private copying(srcDir: string, distDir: string) {
    const source = path.join(srcDir ? srcDir : process.cwd(), '.setup-folder')
    this.spinning(
      'Copying files...',
      () => actions.copy(source, distDir)
    )
  }

  private spinning(str: string, next: Function) {
    const spinner = ora(str).start()
    next()
    spinner.stop()
  }
}
