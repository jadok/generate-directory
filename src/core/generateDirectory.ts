import chalk from 'chalk'
import * as ora from 'ora'
import { join } from 'path'
import * as shell from 'shelljs'

import copy from '../utils/copy'

/**
 * Initialize your project in a few steps.
 */
export class GenerateDirectory {
  /**
   * Source skeleton folder
   */
  protected _srcDir: string

  /**
   * Destination folder
   */
  protected _distDir: string

  /**
   * name of skeleton folder
   */
  public readonly HIDDEN_STRUCTURE_FOLDER: string = '.setup-folder'

  constructor(srcDir: string, distDir: string) {
    this._srcDir = srcDir
    this._distDir = distDir
  }

  /**
   * 
   *
   * @param str
   *   text displayed with the 'next' function is happening.
   * @param next
   *   function that may take a while and so need a text to inform the user that something is happening.
   */
  protected spinning(str: string, next: Function) {
    console.log('spining', str)
    const spinner = ora(str).start()
    next()
    spinner.stop()
  }

  /**
   * Copy the file from the source folder to the destination one.
   *
   * @param srcDir
   *   Source skeleton folder
   * @param distDir
   *   Destination folder
   * 
   * @return boolean
   *   True if an error occurred
   */
  protected copying(srcDir: string, distDir: string) {
    const source = join(srcDir ? srcDir : process.cwd(), this.HIDDEN_STRUCTURE_FOLDER)
    let hasError: boolean = true
    this.spinning(
      'Copying files...',
      () => hasError = copy(source, distDir, true),
    )
    return hasError
  }

  /**
   * Install a npm app.
   * 
   * @return bool
   *   Is the installation successful
   */
  protected installing() {
    shell.cd(this._distDir)
    return !!shell.exec('npm install')
  }

  /**
   * Success message of the installation
   */
  protected success() {
    console.log(chalk.green('Your application has been successfully installed.'))
  }

  /**
   * Failure message of the installation
   */
  protected error() {
    console.log(chalk.red('An error has occurred during the installation of your application.'))
  }

  /**
   * full steps setup of your app.
   */
  public fullGeneration() {
    this.copying(this._srcDir, this._distDir)
    /* if (this.installing()) {
      this.success()
    }
    else {
      this.error()
    } */
  }

}
