import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class PasswordManager {
    static async toHash(password: string): Promise<string> {
        const salt = randomBytes(8).toString('hex');
        const buf = <Buffer>await scryptAsync(password, salt, 64);

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = <Buffer>await scryptAsync(suppliedPassword, salt, 64);
        return buf.toString('hex') === hashedPassword;
    }
}
