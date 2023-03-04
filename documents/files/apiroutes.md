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
- /api/clubs
- /api/clubs/id
- /api/clubs/id/matches
- /api/clubs/id/matches?limit=20&cursor=20

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/clubs | creates new club | gets all clubs | bulk update of all clubs | remove all clubs |
| /api/clubs/id | creates new club | gets club with id | updates club with id | removes club with id |
| /api/clubs/id/matches | creates new match for club with id | gets all matches for club with id | bulk update of all matches for club with id | removes all matches for club with id |

## Speler
- /api/spelers
- /api/spelers/id
- /api/spelers/id/matches
- /api/spelers/id/matches?limit=20&cursor=20

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/spelers | creates new speler | gets all spelers | bulk update of all spelers | remove all spelers |
| /api/spelers/id | creates new speler | gets speler with id | updates speler with id | removes speler with id |
| /api/spelers/id/matches | creates new match for speler with id | gets all matches for speler with id | bulk update of all matches for speler with id | removes all matches for speler with id |

## Team
- /api/teams
- /api/teams/id
- /api/teams/id/matches
- /api/teams/id/matches?limit=20&cursor=20

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/teams | creates new team | gets all teams | bulk update of all teams | remove all teams |
| /api/teams/id | creates new team | gets team with id | updates team with id | removes team with id |
| /api/teams/id/matches | creates new match for team with id | gets all matches for team with id | bulk update of all matches for team with id | removes all matches for team with id |

## Boete
- /api/boetes
- /api/boetes/id
- /api/boetes/id/matches
- /api/boetes/id/matches?limit=20&cursor=20


| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/boetes | creates new boete | gets all boetes | bulk update of all boetes | remove all boetes |
| /api/boetes/id | creates new boete | gets boete with id | updates boete with id | removes boete with id |
| /api/boetes/id/matches | creates new match for boete with id | gets all matches for boete with id | bulk update of all matches for boete with id | removes all matches for boete with id |

## Wedstrijd
- /api/wedstrijden
- /api/wedstrijden/id
- /api/wedstrijden/id/matches
- /api/wedstrijden/id/matches?limit=20&cursor=20

| Resource | POST | GET | PUT | DELETE |
| --- | --- | --- | --- | --- |
| /api/wedstrijden | creates new wedstrijd | gets all wedstrijden | bulk update of all wedstrijden | remove all wedstrijden |
| /api/wedstrijden/id | creates new wedstrijd | gets wedstrijd with id | updates wedstrijd with id | removes wedstrijd with id |
| /api/wedstrijden/id/matches | creates new match for wedstrijd with id | gets all matches for wedstrijd with id | bulk update of all matches for wedstrijd with id | removes all matches for wedstrijd with id |

