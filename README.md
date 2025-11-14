<h1 style="font-family: Times New Roman, serif;">Topic - Society Sharing platform</h1>

- Expand the chat platform into a "community sharing" platform: Users can not only chat but also initiate or organize item sharing (such as old books, old clothes, office equipment) or knowledge sharing (such as skill exchange, tutoring) activities.
<hr/>
<img width="1993" height="983" alt="image" src="https://github.com/user-attachments/assets/32776126-066b-49f1-976e-0c2aaaa4562b"/>

---

<h2 style="font-family: Times New Roman, serif;"><i>Function:</i></h2>

How many **_FUNCTIONS_** do we need for our APP:

**Main Function**

- Users can start a <u><b>"share post"</b></u>: describe the item/service - where/when/exchangeable conditions

- 1 differentiated function: <b><u>quick photo uploading + automatic recognition of categories</u></b> (calling a simple image recognition API)

- 2 ordinary functions: only two pages, <b><u>home is search (sorted by distance)</u></b>, my profile (equivalent to mine)

**Selective Function**

- <b><u>Group chats / Channels</u></b> like "Used Book Exchange," "Skill Mutual Help," "Campus Surplus Item Sharing"

- Chat <b><u>privately + Match</u></b> users with shared activities of interest in the <b><u>dialog box</u></b>

- The system <u><b>tracks sharing behavior</b></u>, issuing "sharing credits" or badges.

- Publish/subscribe to <b><u>real-time notifications</u></b> with Redis: such as "A user is interested in your sharing request"

---

<h2 style="font-family: Times New Roman, serif;"><i>Sustainable value points:</i></h2>
<p><b>Maximize the utilization rate of goods/knowledge resources, reduce waste, and promote recycling.</b></p>

<href><b>Sample:</b> https://www.adverts.ie/</href>

**_Derivative method:_**

- The original chat module is of vital importance;

- Add a <b><u>shared task module</u></b> and a pairing mechanism on its upper layer; A shared UI has been added to the front end.
  Why more "sustainable" : The shift from "instant messaging" to "resource recycling + community mutual assistance" represents a deeper level of social sustainability.

---

<h2 style="font-family: Times New Roman, serif;"><i>Technical part:</i></h2>
<p style="font-family: Times New Roman, serif;">
•	Built a <b><u>WebSocket</u></b>-based real-time messaging platform using <b><u>React</b></u> on the front end and <b><u>Spring + Redis</b></u> on the back end</br>
•	Implemented <b><u>user authentication</u></b>, <b><u>quick photo uploading function</u></b> and offline message caching</br>
•	Employed Redis pub/sub or message queues to handle concurrent messaging, maintaining response latency under 100 ms
</p>
