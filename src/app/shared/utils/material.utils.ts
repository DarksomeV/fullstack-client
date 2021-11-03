declare var M

export class MaterialUtils {
  public static toast(message: string) {
    M.toast(({html: message}))
  }
}
