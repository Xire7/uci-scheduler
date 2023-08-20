# **Zot N' Schedule (uci-scheduler)** 🔥💖
UCI Scheduling app ("Zot N' Schedule") uses openAI's embed API for natural language search and ICSSC's PeterPortal API for UCI information.

# **Zot N' Schedule Walkthrough** 🚀
👉🏿<img src='https://github.com/Xire7/uci-scheduler/blob/main/frontend/uci-scheduler/images/ZotNScheduleDraft2.gif' title='Video Walkthrough' width='' alt='Video Walkthrough: '></img>

# **Tech Stack** 💻⛄
- [X] PERN Stack (PostgreSQL, Express, React, Node) 

* Front-End: React.js
    - Chakra React & Icons UI
    - Fetch API
    - React Router
    - OpenAI Embeddings API

* Back-End: Node.js
-   [X] PostgreSQL
-   [X] Express.js
-   [X] PineconeDB 


This was a nice project to work on to solidify CRUD topics, backend work with PostgreSQL and express routing, as well as node.js fetch API calls and working more with react routing and states! Definitely many things to fix/touch-up too.


## To-do List (MANY bugs/QoL to fix too!) 🌪️
- [ ] figure out how to rerender when adding classes and removing classes without using a hard refresh through useNavigate
- [ ] also find a way to add a space between DEPT and ID 
- [ ] maybe useEffect will be useful for the randomly switch colors when you press add course?
- [ ] fix how inaccurate the database data fetch is, prioritize keywords first in ID if they are retrieved from vectorDB, but that includes adding space between DEPT and ID


## Kudos 🎨
inspired by Zot4Plan and deezy#2930's zotsearch.
check them both out here:

https://github.com/zot4plan/Zot4Plan

https://github.com/dannykd/zotsearch

