import { compare, hash } from 'bcrypt'

export class HashProvider {
  public static async generateHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }

  public static compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}
