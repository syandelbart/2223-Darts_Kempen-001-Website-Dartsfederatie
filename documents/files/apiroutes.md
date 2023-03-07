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