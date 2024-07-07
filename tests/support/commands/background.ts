export function getEnvVariable(name: string, defaultValue?: string): string {
    const value = process.env[name];
    if (value === undefined) {
        if (defaultValue !== undefined) {
            return defaultValue;
        } else {
            throw new Error(`Environment variable ${name} is not defined`);
        }
    }
    return value;
}