export class SignUpInfo {
  username: string;
  role: string[];
  password: string;
  teamName: string

  constructor(username: string, password: string, teamName: string) {
    this.username = username;
    this.password = password;
    this.role = ['user'];
    this.teamName = teamName;
  }
}
