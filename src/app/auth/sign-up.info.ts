export class SignUpInfo {
  username: string;
  role: string[];
  password: string;
  teamName: string
  name: string;

  constructor(username: string, password: string, teamName: string, name: string) {
    this.username = username;
    this.password = password;
    this.role = ['user'];
    this.teamName = teamName;
    this.name = name;
  }
}
