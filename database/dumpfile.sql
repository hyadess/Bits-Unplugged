--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 15.4 (Ubuntu 15.4-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: author; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.author (
    author_id integer NOT NULL,
    approved boolean DEFAULT false
);


ALTER TABLE public.author OWNER TO postgres;

--
-- Name: Author_author_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Author_author_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Author_author_id_seq" OWNER TO postgres;

--
-- Name: Author_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Author_author_id_seq" OWNED BY public.author.author_id;


--
-- Name: auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth (
    auth_id integer NOT NULL,
    email character varying(30) NOT NULL,
    hashpass character varying(255) NOT NULL,
    authtype integer NOT NULL
);


ALTER TABLE public.auth OWNER TO postgres;

--
-- Name: auth_auth_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_auth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_auth_id_seq OWNER TO postgres;

--
-- Name: auth_auth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_auth_id_seq OWNED BY public.auth.auth_id;


--
-- Name: canvas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.canvas (
    canvas_id integer NOT NULL,
    name character varying(30) NOT NULL,
    classname character varying(20),
    info character varying(1000),
    logo text
);


ALTER TABLE public.canvas OWNER TO postgres;

--
-- Name: canvas_canvas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.canvas_canvas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.canvas_canvas_id_seq OWNER TO postgres;

--
-- Name: canvas_canvas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.canvas_canvas_id_seq OWNED BY public.canvas.canvas_id;


--
-- Name: problem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.problem (
    problem_id integer NOT NULL,
    series_id integer NOT NULL,
    author_id integer NOT NULL,
    title character varying(50) NOT NULL,
    statement character varying(1000) DEFAULT ''::character varying,
    canvas_data json,
    is_live boolean DEFAULT false,
    creation_time bigint,
    solution_checker character varying(10000)
);


ALTER TABLE public.problem OWNER TO postgres;

--
-- Name: problem_author_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.problem_author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.problem_author_id_seq OWNER TO postgres;

--
-- Name: problem_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.problem_author_id_seq OWNED BY public.problem.author_id;


--
-- Name: problem_problem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.problem_problem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.problem_problem_id_seq OWNER TO postgres;

--
-- Name: problem_problem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.problem_problem_id_seq OWNED BY public.problem.problem_id;


--
-- Name: problem_series_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.problem_series_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.problem_series_id_seq OWNER TO postgres;

--
-- Name: problem_series_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.problem_series_id_seq OWNED BY public.problem.series_id;


--
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    user_id integer NOT NULL,
    fullname character varying(30),
    username character varying(20) NOT NULL,
    image text,
    dob date,
    is_public boolean
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- Name: series; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.series (
    series_id integer NOT NULL,
    topic_id integer NOT NULL,
    canvas_id integer NOT NULL,
    name character varying(30),
    description character varying(1000),
    logo text,
    template character varying(1000)
);


ALTER TABLE public.series OWNER TO postgres;

--
-- Name: series_canvas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.series_canvas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_canvas_id_seq OWNER TO postgres;

--
-- Name: series_canvas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.series_canvas_id_seq OWNED BY public.series.canvas_id;


--
-- Name: series_series_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.series_series_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_series_id_seq OWNER TO postgres;

--
-- Name: series_series_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.series_series_id_seq OWNED BY public.series.series_id;


--
-- Name: series_topic_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.series_topic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.series_topic_id_seq OWNER TO postgres;

--
-- Name: series_topic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.series_topic_id_seq OWNED BY public.series.topic_id;


--
-- Name: topic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topic (
    topic_id integer NOT NULL,
    name character varying(20) NOT NULL,
    description character varying(1000),
    logo text
);


ALTER TABLE public.topic OWNER TO postgres;

--
-- Name: topic_topic_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topic_topic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.topic_topic_id_seq OWNER TO postgres;

--
-- Name: topic_topic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topic_topic_id_seq OWNED BY public.topic.topic_id;


--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO postgres;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public.profile.user_id;


--
-- Name: auth auth_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth ALTER COLUMN auth_id SET DEFAULT nextval('public.auth_auth_id_seq'::regclass);


--
-- Name: author author_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author ALTER COLUMN author_id SET DEFAULT nextval('public."Author_author_id_seq"'::regclass);


--
-- Name: canvas canvas_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canvas ALTER COLUMN canvas_id SET DEFAULT nextval('public.canvas_canvas_id_seq'::regclass);


--
-- Name: problem problem_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problem ALTER COLUMN problem_id SET DEFAULT nextval('public.problem_problem_id_seq'::regclass);


--
-- Name: problem series_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problem ALTER COLUMN series_id SET DEFAULT nextval('public.problem_series_id_seq'::regclass);


--
-- Name: problem author_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problem ALTER COLUMN author_id SET DEFAULT nextval('public.problem_author_id_seq'::regclass);


--
-- Name: profile user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Name: series series_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series ALTER COLUMN series_id SET DEFAULT nextval('public.series_series_id_seq'::regclass);


--
-- Name: series topic_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series ALTER COLUMN topic_id SET DEFAULT nextval('public.series_topic_id_seq'::regclass);


--
-- Name: series canvas_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series ALTER COLUMN canvas_id SET DEFAULT nextval('public.series_canvas_id_seq'::regclass);


--
-- Name: topic topic_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic ALTER COLUMN topic_id SET DEFAULT nextval('public.topic_topic_id_seq'::regclass);


--
-- Data for Name: auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth (auth_id, email, hashpass, authtype) FROM stdin;
1	mahirlabibdihan@gmail.com	$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK	1
3	sayemshahadsoummo@gmail.com	$2a$10$RRdQ7FylcMpFjS2koZ0BouU5L4zKWoPDOr/Byp3uj7WMnU2sHnxy2	1
11	sakib61@gmail.com	$2a$10$cI.l7Iat5ovsXbqW.dcjIOugnRi4PcMtXvKEa3cBCz4eo5HOkv1fG	1
13	arnabbndc@gmail.com	$2a$10$sd7m3Xua32dcMzhdgBQjWu.Hz5EE.7GMB7UU96eMBviUwYJl6z76W	1
14	1905079@ugrad.cse.buet.ac.bd	$2a$10$ZV2lzgXLxzAwSibvT1zKzukHzl.D7fYvevoI8zgEz1C8/JqlZRwIS	1
16	mahirlabibdihan@gmail.com	$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK	0
17	muntasirnahid@gmail.com	$2a$10$rVx/DpszxyGocTG11M7OCe5ej8CxYpAIdYYk6CZnoA4rKytgR6oYa	0
18	1905073@ugrad.cse.buet.ac.bd	$2a$10$Ffa4BpY36pBmxbVBQOHz0ODde.pfI4oaSALqHm/Vtar/pkL2rEYNm	1
19	1905073@ugrad.cse.buet.ac.bd	$2a$10$LMfk3IqN8K41O.6zSf9SLuNPe/wpNTnG/TDH0Ssn3BWU6OtauAa2C	0
12	souvik7701@gmail.com	$2a$10$RRdQ7FylcMpFjS2koZ0BouU5L4zKWoPDOr/Byp3uj7WMnU2sHnxy2	1
\.


--
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.author (author_id, approved) FROM stdin;
1	f
2	f
3	f
4	f
5	f
6	f
\.


--
-- Data for Name: canvas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.canvas (canvas_id, name, classname, info, logo) FROM stdin;
1	Graph	GraphComponent	Click anywhere in the canvas to create nodes. Click on two nodes to create an edge between them. You can drag nodes.	https://cdn0.iconfinder.com/data/icons/graph-4/100/graph1-512.png
2	Tower of Hanoi	TowerOfHanoi	Put stacks into pegs	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbAENY_duGomNEm95iTrLS6t6phHPiZ0pSAbgIwhXTOYCcIvfcj1z6QiSeM_PQblTkfoU&usqp=CAU
3	Red Black Tree	RbTree	Insert or Delete nodes	https://ds055uzetaobb.cloudfront.net/brioche/uploads/DtAKvHZ65j-rb-1.png?width=1200
\.


--
-- Data for Name: problem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.problem (problem_id, series_id, author_id, title, statement, canvas_data, is_live, creation_time, solution_checker) FROM stdin;
19	2	3	Untitled	 	\N	f	1694029168559	\N
2	1	3	this is the title	 	{"nodes":[{"x":663.6000061035156,"y":233,"nodeIndex":0},{"x":782.6000061035156,"y":386,"nodeIndex":1},{"x":921.9713979122508,"y":315.989737423197,"nodeIndex":2},{"x":923.9711551352016,"y":212.96591543243034,"nodeIndex":3},{"x":1101.949547977814,"y":337.9948256153996,"nodeIndex":4},{"x":846.9805020515995,"y":588.0526459813381,"nodeIndex":5},{"x":912.9724904089727,"y":475.0265111759339,"nodeIndex":6},{"x":1035.9575596204409,"y":467.02466092422384,"nodeIndex":7},{"x":775.9891206368496,"y":152.80199469499465,"nodeIndex":8},{"x":756.991427018818,"y":262.8274356560076,"nodeIndex":9}],"edges":[{"start":{"x":756.991427018818,"y":262.8274356560076,"nodeIndex":9},"end":{"x":775.9891206368496,"y":152.80199469499465,"nodeIndex":8},"weight":"78"}]}	f	\N	
36	2	1	Reverse the disks	Reverse the disks in the 3 pegs	{"numberOfMoves":3,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0],[1],[2]]}	t	1694041203606	function solutionChecker(data) {\r\n// Check if the pegs are ordered as 2, 1, 0\r\nconst isPegsOrdered = data.pegs.map(peg => peg[0]).toString() === "2,1,0";\r\n\r\n// Check if the number of moves is equal to 3\r\nconst isNumberOfMovesEqual3 = data.numberOfMoves === 3;\r\n\r\n// Check both conditions\r\nif (isPegsOrdered && isNumberOfMovesEqual3) {\r\n  console.log("Pegs are ordered as 2, 1, 0, and the number of moves is 3.");\r\n  return true;\r\n} else {\r\n  console.log("Pegs are not ordered as 2, 1, 0, or the number of moves is not 3.");\r\n  return false;\r\n}\r\n\r\n}
64	1	1	New Problem	Demo Statement $ 1 \\div 2 $	{"nodes":[{"x":589.0495281153314,"y":211.73682671781572,"nodeIndex":0},{"x":1023.9384385996234,"y":159.71139706666233,"nodeIndex":1},{"x":898.9703608742522,"y":399.8287646873702,"nodeIndex":2}],"edges":[{"start":{"x":589.0495281153314,"y":211.73682671781572,"nodeIndex":0},"end":{"x":1023.9384385996234,"y":159.71139706666233,"nodeIndex":1},"weight":"6"},{"start":{"x":1023.9384385996234,"y":159.71139706666233,"nodeIndex":1},"end":{"x":898.9703608742522,"y":399.8287646873702,"nodeIndex":2},"weight":"4"}]}	t	1694060275420	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}
65	3	1	Untitled		\N	f	1694061787958	function solutionChecker(data) {\n  return false;\n}\n
66	2	1	Untitled		\N	f	1694077398188	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return false;\n}\n
67	2	1	Untitled		\N	f	1694078186105	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return false;\n}\n
30	1	1	MST first problem	 Statement 	{"nodes":[{"x":452.5,"y":221,"nodeIndex":0},{"x":794.5,"y":208,"nodeIndex":1},{"x":1014.5,"y":385,"nodeIndex":2},{"x":709.5,"y":381,"nodeIndex":3},{"x":565.5,"y":520,"nodeIndex":4}],"edges":[{"start":{"x":452.5,"y":221,"nodeIndex":0},"end":{"x":794.5,"y":208,"nodeIndex":1},"weight":"10"},{"start":{"x":794.5,"y":208,"nodeIndex":1},"end":{"x":1014.5,"y":385,"nodeIndex":2},"weight":"30"},{"start":{"x":794.5,"y":208,"nodeIndex":1},"end":{"x":709.5,"y":381,"nodeIndex":3},"weight":"5"},{"start":{"x":452.5,"y":221,"nodeIndex":0},"end":{"x":565.5,"y":520,"nodeIndex":4},"weight":"2"},{"start":{"x":565.5,"y":520,"nodeIndex":4},"end":{"x":1014.5,"y":385,"nodeIndex":2},"weight":"50"},{"start":{"x":565.5,"y":520,"nodeIndex":4},"end":{"x":709.5,"y":381,"nodeIndex":3},"weight":"3"}]}	t	1694032352472	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\nconst graph = new Map();\nfor (const edge of data.edges) {\n  const { start, end, weight } = edge;\n  \n  if (!graph.has(start.nodeIndex)) {\n    graph.set(start.nodeIndex, []);\n  }\n  \n  if (!graph.has(end.nodeIndex)) {\n    graph.set(end.nodeIndex, []);\n  }\n  \n  graph.get(start.nodeIndex).push({ nodeIndex: end.nodeIndex, weight: parseInt(weight) });\n  graph.get(end.nodeIndex).push({ nodeIndex: start.nodeIndex, weight: parseInt(weight) });\n}\n\n// Step 3: Implement DFS to check if the graph is disconnected\nfunction isDisconnected() {\n  const visited = new Set();\n  const nodes = [...graph.keys()];\n  \n  function dfs(node) {\n    visited.add(node);\n    for (const neighbor of graph.get(node)) {\n      if (!visited.has(neighbor.nodeIndex)) {\n        dfs(neighbor.nodeIndex);\n      }\n    }\n  }\n  \n  dfs(nodes[0]); // Start DFS from the first node\n  \n  return visited.size !== nodes.length;\n}\n\nconst disconnected = isDisconnected();\n\n// Step 4: Calculate the sum of edge weights\nfunction sumEdgeWeights() {\n  let sum = 0;\n  for (const edges of graph.values()) {\n    for (const edge of edges) {\n      sum += edge.weight;\n    }\n  }\n  return sum/2;\n}\n\n\n\n\t// if (disconnected)\n\t// \treturn false;\n\n\t// else {\n  const edgeWeightSum = sumEdgeWeights();\n  console.log(edgeWeightSum);\n\t\tif(edgeWeightSum == 40){\n\t\t\treturn true;\t\n\t\t}\n\t\telse {\n\t\t\treturn false;\n\t\t}\n\t// }\n\n}
61	3	1	Red Black Demo		\N	t	1694059054029	function solutionChecker(data) {\n  return false;\n}\n
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (user_id, fullname, username, image, dob, is_public) FROM stdin;
1	Mahir Labib Dihan	mahirlabibdihan	https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/342405302_162812986420549_8137144512048864097_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=fe8171&_nc_eui2=AeHw-ardLyEMPZ05SvCKzkNYxgMQYlgi39jGAxBiWCLf2OU4ZKaDV5eMDUE7MfDEJoCa3p9eoteVz1MLhqjZc7Zc&_nc_ohc=nwQTIEvz8ikAX9oHkFi&_nc_ht=scontent.fdac14-1.fna&oh=00_AfCnajVEvgUv-8QKQhWh4tsbLwxA07D4NDtCOXnC4dmT8w&oe=64FA5A9A	\N	\N
16	Mahir Labib Dihan	dihan	https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/342405302_162812986420549_8137144512048864097_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=fe8171&_nc_eui2=AeHw-ardLyEMPZ05SvCKzkNYxgMQYlgi39jGAxBiWCLf2OU4ZKaDV5eMDUE7MfDEJoCa3p9eoteVz1MLhqjZc7Zc&_nc_ohc=nwQTIEvz8ikAX9oHkFi&_nc_ht=scontent.fdac14-1.fna&oh=00_AfCnajVEvgUv-8QKQhWh4tsbLwxA07D4NDtCOXnC4dmT8w&oe=64FA5A9A	\N	\N
3	Sayem Shahad Soummo	sayem	https://scontent.fdac14-1.fna.fbcdn.net/v/t1.6435-9/81749674_686656911866573_7365527402610425856_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeE9vhQJXDcVOfPVBej2gZud74e6qfF_uSPvh7qp8X-5I7oz3GuCanH6AD6oj7Rb8EsTyhJeb3RdfVJ5wb4NHZo2&_nc_ohc=v9XiFvanZ6EAX_gNk7m&_nc_ht=scontent.fdac14-1.fna&oh=00_AfC8wldN1MbABKd3MJYMWCe1wQFItQSVwWRCQ4PtdH9irg&oe=651D5601	\N	\N
14	Salman Sayeed	salman	https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/357423938_1524821001621823_5548694083827731007_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=fe8171&_nc_eui2=AeHc5G1b-JOHaB2xCFqMza58CzHQXTUanJALMdBdNRqckHbXEMnysHdivY9rA5pcD3j6IRukUK6eLEuANjCz9aD7&_nc_ohc=Af7TkSqLGTIAX9hnSSi&_nc_ht=scontent.fdac14-1.fna&oh=00_AfCSN6P2ZH4EHeoeF0Wy_2KAH31osKIolB8_HEdquqVJ6w&oe=64FA80A7	\N	\N
13	Arnab Bhattacharjee	Arnab	https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/293068528_1664553273919960_3560586561912931674_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1b51e3&_nc_eui2=AeHAdjMutlfyhKhkiPAZBynNQ5OFoKCON-VDk4WgoI435bpICZ9U_nF2sJEvNXrs5hL3o2nF2Xda0mtF69n-A_ad&_nc_ohc=PjXZyE0rGUIAX8iXEGX&_nc_ht=scontent.fdac14-1.fna&oh=00_AfCclDPgWBfnhmVtFJ0jQWK2IyyEZcrebQehzoYNaiSt8Q&oe=64FAAC07	\N	\N
11	Nazmus Sakib	sakib	https://scontent.fdac14-1.fna.fbcdn.net/v/t1.6435-9/157160094_302953714522127_1093822864719188446_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_eui2=AeH6Q7_6awCabPTzZV-dhiY2Pqaq9Nppypg-pqr02mnKmCI7zdN2qyFqMORyuMzHjiC-JDeAhf1h6rR5Kgm3KKvH&_nc_ohc=4mNIKwxluowAX961-C6&_nc_ht=scontent.fdac14-1.fna&oh=00_AfB1FGzWU9ROR8Ghcif1zlfNNB00RkBI_AI3jGt-STx3CQ&oe=651D4A4C	\N	\N
12	Souvik Ghosh	souvik	https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/293068528_1664553273919960_3560586561912931674_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1b51e3&_nc_eui2=AeHAdjMutlfyhKhkiPAZBynNQ5OFoKCON-VDk4WgoI435bpICZ9U_nF2sJEvNXrs5hL3o2nF2Xda0mtF69n-A_ad&_nc_ohc=PjXZyE0rGUIAX8iXEGX&_nc_ht=scontent.fdac14-1.fna&oh=00_AfCclDPgWBfnhmVtFJ0jQWK2IyyEZcrebQehzoYNaiSt8Q&oe=64FAAC07	\N	\N
17	Muntasi Mamun Nahid	nahid	\N	\N	\N
18	Souvik Ghosh	Sheldor7701	\N	\N	\N
19	Souvik Ghosh	sheldor7701	\N	\N	\N
\.


--
-- Data for Name: series; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.series (series_id, topic_id, canvas_id, name, description, logo, template) FROM stdin;
1	6	1	Minimum Spanning Tree		https://blog-c7ff.kxcdn.com/blog/wp-content/uploads/2017/01/blog-10.jpg	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}
2	2	2	Tower Of Hanoi	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbAENY_duGomNEm95iTrLS6t6phHPiZ0pSAbgIwhXTOYCcIvfcj1z6QiSeM_PQblTkfoU&usqp=CAU	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return false;\n}\n
3	8	3	Red Black	\N	https://ds055uzetaobb.cloudfront.net/brioche/uploads/DtAKvHZ65j-rb-1.png?width=1200	function solutionChecker(data) {\n  return false;\n}\n
\.


--
-- Data for Name: topic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topic (topic_id, name, description, logo) FROM stdin;
6	Graph	Nodes and Edges	https://cdn0.iconfinder.com/data/icons/graph-4/100/graph1-512.png
2	Recursion	\N	https://res.cloudinary.com/practicaldev/image/fetch/s--BWDV0wtG--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/226xc0p9pgtgadnin92j.jpeg
3	Sorting	\N	https://149695847.v2.pressablecdn.com/wp-content/uploads/2022/07/Sorting-Image.jpg
8	Tree	\N	https://files.codingninjas.in/article_images/application-of-tree-in-data-structure-6-1681315263.webp
\.


--
-- Name: Author_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Author_author_id_seq"', 6, true);


--
-- Name: auth_auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_auth_id_seq', 1, true);


--
-- Name: canvas_canvas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.canvas_canvas_id_seq', 4, true);


--
-- Name: problem_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.problem_author_id_seq', 1, false);


--
-- Name: problem_problem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.problem_problem_id_seq', 67, true);


--
-- Name: problem_series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.problem_series_id_seq', 1, false);


--
-- Name: series_canvas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.series_canvas_id_seq', 1, false);


--
-- Name: series_series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.series_series_id_seq', 3, true);


--
-- Name: series_topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.series_topic_id_seq', 1, false);


--
-- Name: topic_topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topic_topic_id_seq', 8, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_user_id_seq', 19, true);


--
-- Name: author Author_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT "Author_pkey" PRIMARY KEY (author_id);


--
-- Name: auth auth_email_authtype_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT auth_email_authtype_key UNIQUE (email, authtype);


--
-- Name: auth auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT auth_pkey PRIMARY KEY (auth_id);


--
-- Name: canvas canvas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.canvas
    ADD CONSTRAINT canvas_pkey PRIMARY KEY (canvas_id);


--
-- Name: problem problem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problem
    ADD CONSTRAINT problem_pkey PRIMARY KEY (problem_id);


--
-- Name: series series_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (series_id);


--
-- Name: topic topic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT topic_pkey PRIMARY KEY (topic_id);


--
-- Name: profile user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: profile user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: auth auth_auth_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT auth_auth_id_fkey FOREIGN KEY (auth_id) REFERENCES public.profile(user_id) NOT VALID;


--
-- Name: problem problem_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problem
    ADD CONSTRAINT problem_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.author(author_id) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;


--
-- Name: problem problem_series_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problem
    ADD CONSTRAINT problem_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.series(series_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: series series_canvas_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_canvas_id_fkey FOREIGN KEY (canvas_id) REFERENCES public.canvas(canvas_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: series series_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topic(topic_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

