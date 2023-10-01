# **Zot N' Schedule (uci-scheduler)** 🔥💖
Zot N' Schedule (name still pending) helps a student plan out their four years using a natural language search engine wired to UCI's course data.

# **Video Walkthrough** 🚀
<img src='https://github.com/Xire7/uci-scheduler/blob/main/frontend/uci-scheduler/images/ZotNScheduleDraft3.gif' title='Video Walkthrough' width='' alt='Video Walkthrough: '></img>

# **Tech Stack** 💻⛄
- [X] PERN Stack (PostgreSQL, Express, React, Node) 

* Front-End: React.js
    - Chakra React & Icons UI
    - Fetch API
    - React Router

* Back-End: Node.js
    -  PostgreSQL
    -  Express.js
    -  PineconeDB 

* External APIs:
    - OpenAI Embeddings API
    - PeterPortal Course Info API


This was a nice project to work on to solidify CRUD topics, backend work with PostgreSQL and express routing, as well as node.js fetch API calls and working more with react routing and states! Definitely many things to fix/touch-up too.


## To-do List (MANY bugs/QoL to fix too!) 🌪️
- # [X] Add a prerequisite tree check!
- # [ ] Scale the website to allow other users to access databases and be able to schedule simultaneously without unauthorized interferences 
- [X] figured out how to rerender when adding classes and removing classes without using a hard refresh through useNavigate
- [X] also found out a way to add a space between DEPT and ID 
- [X] fixed how inaccurate the database data fetch is, prioritize keywords first in ID if they are retrieved from vectorDB, but that includes adding space between DEPT and ID
- [X] add plus buttons to every card which automatically procs the drawer and has those filled out except for course name
- [ ] add a color picker for the class tags
- [ ] title should also be customizable by the user for each list, and each list should ask for a year timeframe
- [ ] add a description to the drawer when there are no search elements loaded
- [ ] add description to the bottom when there are no courses initially chosen
- [ ] how does the ref targetting work for the popover tags?


## Kudos 🎨
inspired by Zot4Plan and deezy#2930's zotsearch.
check them both out here:

https://github.com/zot4plan/Zot4Plan

https://github.com/dannykd/zotsearch

