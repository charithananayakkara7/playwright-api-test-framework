

interface AuthenticationData {
    email: string,
    password: string
}

export class TokenGeneration {
    private token: string | null = null;
    public async getToken(url: string, username: string, password: string): Promise<string> {
        if (this.token) {
            return this.token;
        } else {
            return this.createToken(url, username, password);
        }
    }

    private async createToken(url: string, username: string, password: string): Promise<string> {
        const auth: AuthenticationData = {
            email: username,
            password: password
        };
        const token = await this.generateRawToken(url, auth);
        return token;
    }

    private async generateRawToken(url: string, auth: AuthenticationData): Promise<string> {
                    const rawResponse = await fetch(url, {
                        method: 'POST',
                        headers: {
                          'Accept': '*/*',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(auth)
                      });
                      const response = await rawResponse.json();
                  return  this.sanitizeToken( response);   
    }

    private sanitizeToken(response: { data: { token: string; }; }): string {
        if (Object.prototype.hasOwnProperty.call(response, "data")) {
            if (Object.prototype.hasOwnProperty.call(response.data, "token")) {
                return "Bearer " + response.data.token;
            } else {
                throw new Error('Token was not generated');
            }
        } else {
            throw new Error('Data was not generated');
        }
    }

}