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
   * name of skeleton folder
   */
  public readonly HIDDEN_STRUCTURE_FOLDER: string = '.setup-folder'

  /**
   * Source skeleton folder
   */
  public srcDir: string

  /**
   * Destination folder
   */
  public distDir: string

  constructor(srcDir: string, distDir: string) {
    this.srcDir = srcDir
    this.distDir = distDir
  }

  /**
   * Display a spinner while the action is happening.
   *
   * @param str
   *   text displayed with the 'next' function is happening.
   * @param next
   *   function that may take a while and so need a text to inform the user that something is happening.
   */
  public spinning(str: string, next: Function) {
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
  public copying(srcDir: string, distDir: string) {
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
  public installing() {
    shell.cd(this.distDir)
    return !!shell.exec('npm install')
  }

  /**
   * Success message of the installation
   */
  public success() {
    console.log(chalk.green('Your application has been successfully installed.'))
  }

  /**
   * Failure message of the installation
   */
  public error() {
    console.log(chalk.red('An error has occurred during the installation of your application.'))
  }

  /**
   * full steps setup of your app.
   */
  public fullGeneration() {
    this.copying(this.srcDir, this.distDir)
    if (this.installing()) {
      this.success()
    }
    else {
      this.error()
    }
  }
}
