# Api Routes

## Api best practices

- Error status codes
- Accept and return json
- No verbs
- Plural nouns to represent collections
- Singular nouns to represent individual resources
- Use query parameters to filter, sort and paginate collections
- Document your api
- Avoid requiring resource URIs more complex than collection/item/collection.
- Use HTTP headers to indicate the media type of the resource.

## Club

- /api/clubs?limit=20&cursor=20
- /api/clubs/id
- /api/clubs/id/teams?limit=20&cursor=20
- /api/clubs/id/matches?limit=20&cursor=20

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/clubs | creates new club | gets all clubs | bulk update of all clubs | / |
| /api/clubs/id | / | gets club with id | updates club with id | removes club with id |
| /api/clubs/id/teams | / | gets all teams for club with id | / | /
| /api/clubs/id/matches | / | gets all matches for club with id | / | / |


## Team

- /api/teams?limit=20&cursor=20
- /api/teams/id
- /api/teams/id/players?limit=20&cursor=20
- /api/teams/id/matches?limit=20&cursor=20

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/teams | creates new team | gets all teams | bulk update of all teams | / |
| /api/teams/id | / | gets team with id | updates team with id | removes team with id |
| /api/teams/id/players | / | gets all players for team with id | / | / |
| /api/teams/id/matches | / | gets all matches for team with id | / | / |

## Players

- /api/players?limit=20&cursor=20
- /api/players/id
- /api/players/id/matches?limit=20&cursor=20

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/players | creates new player | gets all players | bulk update of all players | / |
| /api/players/id | / | gets player with id | updates player with id | removes player with id |
| /api/players/id/matches | / | gets all matches for player with id | / | / |

## Fine

- /api/fines?limit=20&cursor=20&type=club&id=1
- /api/fines/id

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/fines | creates new fine | gets all fines | bulk update of all fines | / |
| /api/fines/id | / | gets fine with id | updates fine with id | removes fine with id |

## Match

- /api/matches?limit=20&cursor=20
- /api/matches/id

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/matches | creates new match | gets all matches | bulk update of all matches | / |
| /api/matches/id | / | gets match with id | updates match with id | removes match with id |

## Users

- /api/users?limit=20&cursor=20
- /api/users/id
- /api/users/activation/id

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/users | creates new user | gets all users | bulk update of all users | / |
| /api/users/id | / | gets user with id | updates user with id | removes user with id |
| /api/users/activation/id | activate user | get activation state of user | / | / |

## Management

- /api/management?limit=20&cursor=20
- /api/management/id

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/management | / | gets all users from management | / | / |
| /api/management/id | / | gets board member info with id | / | / |

## Posts

- /api/posts?limit=20&cursor=20
- /api/posts/id

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/posts | / | gets all posts | bulk update of all posts | / |
| /api/posts/id | / | gets post with id | updates post with id | removes post with id |

## Documents

- /api/documents?limit=20&cursor=20?type=general
- /api/documents/id
- /api/documents/types

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/documents | / | gets all documents | bulk update of all documents | / |
| /api/posts/id | / | gets document with id | updates document with id | removes document with id |
| /api/documents/types | creates new document type | gets all document types | / | / |
| /api/documents/types/id | / | gets document type with id | updates document type with id | removes document type with id

## Tournaments

- /api/tournaments?limit=20&cursor=20
- /api/tournaments/id
- /api/tournaments/current

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/tournaments | / | gets all tournaments | bulk update of all tournaments | / |
| /api/tournaments/id | / | gets tournament with id | updates tournament with id | removes tournament with id |
| /api/tournaments/current | / | gets current tournament | / | removes current tournament
