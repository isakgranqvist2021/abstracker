export function auth0IdToToString(auth0Id: string): string {
  return auth0Id.split('|')[1];
}
