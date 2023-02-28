1. Authentication provider
2. Datamodel
3. API best practices bespreken 



/api/boete
-	/api/boete/get
-	/api/boete/add
-	/api/boete/pay
-	/api/boete/get/limit/20
-	/api/boete/get?limit=20&cursor=20
	

Cloudflare -> OAuth -> Callback cloudflare -> served page


text-white
text-white dark:text-black




Boete <-> Associatieve tabel <-> Club|Speler|Team




Club|Speler|Team -> Boete


Westrijd {
- club_1 : Club {}
- club_2 : Club {}


Club {
- spelers : {}

Speler {
- clubs : {}
- boetes : {
		
