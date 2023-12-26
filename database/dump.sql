--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg22.04+1)

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
    logo text,
    params json DEFAULT '{}'::json,
    control_params json DEFAULT '{}'::json,
    ui_params json DEFAULT '{}'::json,
    template character varying(10000)
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
    series_id integer,
    author_id integer NOT NULL,
    title character varying(50) NOT NULL,
    statement character varying(1000) DEFAULT ''::character varying,
    canvas_data json,
    is_live boolean DEFAULT false,
    creation_time bigint,
    solution_checker character varying(10000),
    params json,
    ui_params json,
    control_params json,
    canvas_id integer,
    submit_state_id integer,
    serial_no integer DEFAULT 0
);


ALTER TABLE public.problem OWNER TO postgres;

--
-- Name: TABLE problem; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.problem IS '

';


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
-- Name: serial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.serial (
    problem_id integer NOT NULL,
    series_id integer NOT NULL,
    serial_no integer DEFAULT 0
);


ALTER TABLE public.serial OWNER TO postgres;

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
-- Name: state; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.state (
    state_id integer NOT NULL,
    title character varying(100),
    statement character varying(10000),
    canvas_data json,
    solution_checker character varying(10000),
    params json,
    ui_params json,
    control_params json,
    last_updated bigint,
    canvas_id integer
);


ALTER TABLE public.state OWNER TO postgres;

--
-- Name: state_state_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.state_state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.state_state_id_seq OWNER TO postgres;

--
-- Name: state_state_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.state_state_id_seq OWNED BY public.state.state_id;


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
-- Name: state state_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state ALTER COLUMN state_id SET DEFAULT nextval('public.state_state_id_seq'::regclass);


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
12	souvik7701@gmail.com	$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK	1
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

COPY public.canvas (canvas_id, name, classname, info, logo, params, control_params, ui_params, template) FROM stdin;
2	Tower of Hanoi	TowerOfHanoi	Drag and drop top most stacks from one peg to another.\nYou can increase the number of disks direcly from the top left spinner.\nOr you can add disks of different sizes from the bottom spinner. Choose your disk of your preffered size and drag and drop in the pegs.\nAt most 10 disks can be in each peg.\nYou cannot put larger disks over smaller ones.	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbAENY_duGomNEm95iTrLS6t6phHPiZ0pSAbgIwhXTOYCcIvfcj1z6QiSeM_PQblTkfoU&usqp=CAU	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"}, "undo": {"value":true, "type": "switch"}}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return false;\n}\n
1	Graph	GraphComponent	Click anywhere in the canvas to create nodes. Click on two nodes to create an edge between them. You can also drag nodes.	https://cdn0.iconfinder.com/data/icons/graph-4/100/graph1-512.png	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{"add_node":{"value":true,"type":"switch"},"delete_node":{"value":true,"type":"switch"},"drag_node":{"value":true,"type":"switch"},"add_edge":{"value":true,"type":"switch"},"delete_edge":{"value":true,"type":"switch"}}	{}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}
3	Red Black Tree	RbTree	Insert or Delete nodes	https://ds055uzetaobb.cloudfront.net/brioche/uploads/DtAKvHZ65j-rb-1.png?width=1200	{}	{}	{}	\N
\.


--
-- Data for Name: problem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.problem (problem_id, series_id, author_id, title, statement, canvas_data, is_live, creation_time, solution_checker, params, ui_params, control_params, canvas_id, submit_state_id, serial_no) FROM stdin;
36	2	1	Double TOH	Move the disks from left peg to right peg.	{"numberOfMoves":0,"numberOfDisks":10,"numberOfPegs":3,"pegs":[[0,10,2,12,4,14,6,16,8,18],[],[]]}	t	1694059054029	function solutionChecker(data) {\n  return data.numberOfMoves === 2 * (2 ** (data.numberOfDisks/2) - 1);\n}	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	2	2	5
68	2	1	Reverse the Disks	Reverse the 3 disks.	{"numberOfMoves":3,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0],[1],[2]]}	t	1700994610385	function solutionChecker(data) {\n  // Check if the pegs are ordered as 2, 1, 0\n  const isPegsOrdered = data.pegs.map(peg => peg[0]).toString() === "2,1,0";\n  // Check if the number of moves is equal to 3\n  const isNumberOfMovesEqual3 = data.numberOfMoves === 3;\n  // Check both conditions\n  if (isPegsOrdered && isNumberOfMovesEqual3) {\n    console.log("Pegs are ordered as 2, 1, 0, and the number of moves is 3.");\n    return true;\n  } else {\n    console.log("Pegs are not ordered as 2, 1, 0, or the number of moves is not 3.");\n    return false;\n  }\n  }	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	2	8	1
71	2	1	Min 4 Disks	Move the 4 disks from left to right peg in minimum possible moves.	{"numberOfMoves":0,"numberOfDisks":4,"numberOfPegs":3,"pegs":[[0,1,2,3],[],[]]}	t	1701441086141	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.numberOfMoves == 15 && data.pegs[2].length == 4;\n}\n	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"}, "undo": {"value":true, "type": "switch"}}	{}	2	5	4
70	2	1	Min 3 Disks	You already how to move 3 disks from one peg to another. But can you do it in minimum possible moves?	{"numberOfMoves":0,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0,1,2],[],[]]}	t	1701439115392	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.numberOfMoves == 7 && data.pegs[2].length==3;\n}\n	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	2	7	3
69	2	1	3 Disks	Move the 3 disks from left peg to right peg. You can use the middle peg to temporarily keep the disks. 	{"numberOfMoves":0,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0,1,2],[],[]]}	t	1701438806364	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.pegs[2].length === 3;\n}\n	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	2	6	2
74	4	1	Rearrange	Drag the nodes to make the graph a plane graph. In a plane graph there is no crossing edges.	{"nodes":[{"x":261.0943039990184,"y":51,"nodeIndex":0},{"x":529.0116966200333,"y":52.689220058515446,"nodeIndex":1},{"x":275.09357296026633,"y":293.6705298276685,"nodeIndex":2},{"x":524.010600061905,"y":283.6704440926645,"nodeIndex":3},{"x":386.0526347901497,"y":173.1300047808519,"nodeIndex":4},{"x":646.9634480623959,"y":177.67987494309193,"nodeIndex":5},{"x":400.0497106351415,"y":415,"nodeIndex":6},{"x":651.9616204655157,"y":410,"nodeIndex":7}],"edges":[{"start":{"x":261.0943039990184,"y":51,"nodeIndex":0},"end":{"x":529.0116966200333,"y":52.689220058515446,"nodeIndex":1},"weight":"1"},{"start":{"x":529.0116966200333,"y":52.689220058515446,"nodeIndex":1},"end":{"x":524.010600061905,"y":283.6704440926645,"nodeIndex":3},"weight":"1"},{"start":{"x":275.09357296026633,"y":293.6705298276685,"nodeIndex":2},"end":{"x":524.010600061905,"y":283.6704440926645,"nodeIndex":3},"weight":"1"},{"start":{"x":261.0943039990184,"y":51,"nodeIndex":0},"end":{"x":275.09357296026633,"y":293.6705298276685,"nodeIndex":2},"weight":"1"},{"start":{"x":386.0526347901497,"y":173.1300047808519,"nodeIndex":4},"end":{"x":646.9634480623959,"y":177.67987494309193,"nodeIndex":5},"weight":"1"},{"start":{"x":386.0526347901497,"y":173.1300047808519,"nodeIndex":4},"end":{"x":400.0497106351415,"y":415,"nodeIndex":6},"weight":"1"},{"start":{"x":646.9634480623959,"y":177.67987494309193,"nodeIndex":5},"end":{"x":651.9616204655157,"y":410,"nodeIndex":7},"weight":"1"},{"start":{"x":400.0497106351415,"y":415,"nodeIndex":6},"end":{"x":651.9616204655157,"y":410,"nodeIndex":7},"weight":"1"},{"start":{"x":524.010600061905,"y":283.6704440926645,"nodeIndex":3},"end":{"x":651.9616204655157,"y":410,"nodeIndex":7},"weight":""},{"start":{"x":529.0116966200333,"y":52.689220058515446,"nodeIndex":1},"end":{"x":646.9634480623959,"y":177.67987494309193,"nodeIndex":5},"weight":"1"},{"start":{"x":261.0943039990184,"y":51,"nodeIndex":0},"end":{"x":386.0526347901497,"y":173.1300047808519,"nodeIndex":4},"weight":"1"},{"start":{"x":275.09357296026633,"y":293.6705298276685,"nodeIndex":2},"end":{"x":400.0497106351415,"y":415,"nodeIndex":6},"weight":"1"}]}	t	1702049450177	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction isIntersecting(a, b, c, d) {\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\n    function ccw(a, b, c) {\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\n    }\n\n    return (\n        ccw(a, c, d) !== ccw(b, c, d) &&\n        ccw(a, b, c) !== ccw(a, b, d)\n    );\n}\n\n\nfunction hasCommonNode(edgeA, edgeB) {\n    return (\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.end) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.end)\n    );\n}\n\nfunction solutionChecker(data) {\n    const nodes = data.nodes;\n    const edges = data.edges;\n\n    for (let i = 0; i < edges.length; i++) {\n        const edgeA = edges[i];\n        \n        const startA = nodes[edgeA.start.nodeIndex];\n        const endA = nodes[edgeA.end.nodeIndex];\n\n        for (let j = i + 1; j < edges.length; j++) {\n            const edgeB = edges[j];\n\n            const startB = nodes[edgeB.start.nodeIndex];\n            const endB = nodes[edgeB.end.nodeIndex];\n\n            if (\n                isIntersecting(startA, endA, startB, endB) &&\n                !hasCommonNode(edgeA, edgeB)\n            ) {\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\n                return false;\n            }\n        }\n    }\n\n    // No intersections found, it's a plane graph\n    return true;\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{}	{"add_node":{"value":true,"type":"switch"},"delete_node":{"value":true,"type":"switch"},"drag_node":{"value":true,"type":"switch"},"add_edge":{"value":true,"type":"switch"},"delete_edge":{"value":true,"type":"switch"}}	1	4	0
30	1	1	Road Construction	There are 5 cities numbered from 0 to 4. We can construct roads between cities. Each road has a number associated with it denoting the cost to construct a road. We want to minimize our cost. Remove the roads from the given canvas in a way that from every city we can go to every other city and cost of constructing the remaining roads are minimum.	{"nodes":[{"x":191.46353373570471,"y":209.08105010004624,"nodeIndex":0},{"x":480.45356288618734,"y":79.05215958998558,"nodeIndex":1},{"x":717.4589382793936,"y":266.96633313305256,"nodeIndex":2},{"x":440.46237224675286,"y":238.0461718019531,"nodeIndex":3},{"x":415.4808662930142,"y":394.99793083470826,"nodeIndex":4}],"edges":[{"start":{"x":191.46353373570471,"y":209.08105010004624,"nodeIndex":0},"end":{"x":480.45356288618734,"y":79.05215958998558,"nodeIndex":1},"weight":"10"},{"start":{"x":480.45356288618734,"y":79.05215958998558,"nodeIndex":1},"end":{"x":717.4589382793936,"y":266.96633313305256,"nodeIndex":2},"weight":"30"},{"start":{"x":480.45356288618734,"y":79.05215958998558,"nodeIndex":1},"end":{"x":440.46237224675286,"y":238.0461718019531,"nodeIndex":3},"weight":"5"},{"start":{"x":191.46353373570471,"y":209.08105010004624,"nodeIndex":0},"end":{"x":415.4808662930142,"y":394.99793083470826,"nodeIndex":4},"weight":"2"},{"start":{"x":415.4808662930142,"y":394.99793083470826,"nodeIndex":4},"end":{"x":717.4589382793936,"y":266.96633313305256,"nodeIndex":2},"weight":"50"},{"start":{"x":415.4808662930142,"y":394.99793083470826,"nodeIndex":4},"end":{"x":440.46237224675286,"y":238.0461718019531,"nodeIndex":3},"weight":"3"}]}	t	1694032352472	/**\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const graph = new Map();\n  for (const edge of data.edges) {\n  const { start, end, weight } = edge;\n  \n  if (!graph.has(start.nodeIndex)) {\n    graph.set(start.nodeIndex, []);\n  }\n  \n  if (!graph.has(end.nodeIndex)) {\n    graph.set(end.nodeIndex, []);\n  }\n  \n  graph.get(start.nodeIndex).push({ nodeIndex: end.nodeIndex, weight: parseInt(weight) });\n  graph.get(end.nodeIndex).push({ nodeIndex: start.nodeIndex, weight: parseInt(weight) });\n}\n\n// Step 3: Implement DFS to check if the graph is disconnected\nfunction isDisconnected() {\n  const visited = new Set();\n  const nodes = [...graph.keys()];\n  \n  function dfs(node) {\n    visited.add(node);\n    for (const neighbor of graph.get(node)) {\n      if (!visited.has(neighbor.nodeIndex)) {\n        dfs(neighbor.nodeIndex);\n      }\n    }\n  }\n  \n  dfs(nodes[0]); // Start DFS from the first node\n  \n  return visited.size !== nodes.length;\n}\n\nconst disconnected = isDisconnected();\n\n// Step 4: Calculate the sum of edge weights\nfunction sumEdgeWeights() {\n  let sum = 0;\n  for (const edges of graph.values()) {\n    for (const edge of edges) {\n      sum += edge.weight;\n    }\n  }\n  return sum/2;\n}\n\n\n\n\t// if (disconnected)\n\t// \treturn false;\n\n\t// else {\n  const edgeWeightSum = sumEdgeWeights();\n  console.log(edgeWeightSum);\n\t\tif(edgeWeightSum == 40){\n\t\t\treturn true;\t\n\t\t}\n\t\telse {\n\t\t\treturn false;\n\t\t}\n\t// }\n\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{}	{"add_node":{"value":true,"type":"switch"},"delete_node":{"value":true,"type":"switch"},"drag_node":{"value":true,"type":"switch"},"add_edge":{"value":true,"type":"switch"},"delete_edge":{"value":true,"type":"switch"}}	1	3	0
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (user_id, fullname, username, image, dob, is_public) FROM stdin;
14	Salman Sayeed	salman	https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/357423938_1524821001621823_5548694083827731007_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=fe8171&_nc_eui2=AeHc5G1b-JOHaB2xCFqMza58CzHQXTUanJALMdBdNRqckHbXEMnysHdivY9rA5pcD3j6IRukUK6eLEuANjCz9aD7&_nc_ohc=Af7TkSqLGTIAX9hnSSi&_nc_ht=scontent.fdac14-1.fna&oh=00_AfCSN6P2ZH4EHeoeF0Wy_2KAH31osKIolB8_HEdquqVJ6w&oe=64FA80A7	\N	\N
13	Arnab Bhattacharjee	Arnab	https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/293068528_1664553273919960_3560586561912931674_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1b51e3&_nc_eui2=AeHAdjMutlfyhKhkiPAZBynNQ5OFoKCON-VDk4WgoI435bpICZ9U_nF2sJEvNXrs5hL3o2nF2Xda0mtF69n-A_ad&_nc_ohc=PjXZyE0rGUIAX8iXEGX&_nc_ht=scontent.fdac14-1.fna&oh=00_AfCclDPgWBfnhmVtFJ0jQWK2IyyEZcrebQehzoYNaiSt8Q&oe=64FAAC07	\N	\N
11	Nazmus Sakib	sakib	https://scontent.fdac14-1.fna.fbcdn.net/v/t1.6435-9/157160094_302953714522127_1093822864719188446_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_eui2=AeH6Q7_6awCabPTzZV-dhiY2Pqaq9Nppypg-pqr02mnKmCI7zdN2qyFqMORyuMzHjiC-JDeAhf1h6rR5Kgm3KKvH&_nc_ohc=4mNIKwxluowAX961-C6&_nc_ht=scontent.fdac14-1.fna&oh=00_AfB1FGzWU9ROR8Ghcif1zlfNNB00RkBI_AI3jGt-STx3CQ&oe=651D4A4C	\N	\N
17	Muntasi Mamun Nahid	nahid	\N	\N	\N
18	Souvik Ghosh	Sheldor7701	\N	\N	\N
19	Souvik Ghosh	sheldor7701	\N	\N	\N
16	Mahir Labib Dihan	dihan	https://preview.redd.it/tried-to-make-the-discord-clyde-logo-more-similar-to-the-v0-g2bha52fh9v91.png?auto=webp&s=f74e8a7068998d18b22fa3bbb3e62ee9975204d3	\N	\N
1	Mahir Labib Dihan	mahirlabibdihan	https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31	\N	\N
3	Sayem Shahad Soummo	sayem	https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/au/wp-content/uploads/2022/09/bored_ape_yacht_club.jpeg-1.jpg	\N	\N
12	Souvik Ghosh	souvik	https://www.businessinsider.in/thumb.cms?msid=87162740&width=1200&height=900	\N	\N
\.


--
-- Data for Name: serial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.serial (problem_id, series_id, serial_no) FROM stdin;
\.


--
-- Data for Name: series; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.series (series_id, topic_id, canvas_id, name, description, logo, template) FROM stdin;
1	6	1	Minimum Spanning Tree		https://blog-c7ff.kxcdn.com/blog/wp-content/uploads/2017/01/blog-10.jpg	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}
3	8	3	Red Black	\N	https://ds055uzetaobb.cloudfront.net/brioche/uploads/DtAKvHZ65j-rb-1.png?width=1200	function solutionChecker(data) {\n  return false;\n}\n
4	6	1	Planar Graph	\N	https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs00373-018-1932-6/MediaObjects/373_2018_1932_Fig3_HTML.png	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}
2	2	2	Tower Of Hanoi	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbAENY_duGomNEm95iTrLS6t6phHPiZ0pSAbgIwhXTOYCcIvfcj1z6QiSeM_PQblTkfoU&usqp=CAU	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return false;\n}\n
\.


--
-- Data for Name: state; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.state (state_id, title, statement, canvas_data, solution_checker, params, ui_params, control_params, last_updated, canvas_id) FROM stdin;
2	Double TOH	Move the disks from left peg to right peg.	{"numberOfMoves":0,"numberOfDisks":10,"numberOfPegs":3,"pegs":[[0,10,2,12,4,14,6,16,8,18],[],[]]}	function solutionChecker(data) {\n  return data.numberOfMoves === 2 * (2 ** (data.numberOfDisks/2) - 1);\n}	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	1703588507720	2
7	Min 3 Disks	You already how to move 3 disks from one peg to another. But can you do it in minimum possible moves?	{"numberOfMoves":0,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0,1,2],[],[]]}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.numberOfMoves == 7 && data.pegs[2].length==3;\n}\n	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	1703618027388	\N
4	Rearrange	Drag the nodes to make the graph a plane graph. In a plane graph there is no crossing edges.	{"nodes":[{"x":261.0943039990184,"y":51,"nodeIndex":0},{"x":529.0116966200333,"y":52.689220058515446,"nodeIndex":1},{"x":275.09357296026633,"y":293.6705298276685,"nodeIndex":2},{"x":524.010600061905,"y":283.6704440926645,"nodeIndex":3},{"x":386.0526347901497,"y":173.1300047808519,"nodeIndex":4},{"x":646.9634480623959,"y":177.67987494309193,"nodeIndex":5},{"x":400.0497106351415,"y":415,"nodeIndex":6},{"x":651.9616204655157,"y":410,"nodeIndex":7}],"edges":[{"start":{"x":261.0943039990184,"y":51,"nodeIndex":0},"end":{"x":529.0116966200333,"y":52.689220058515446,"nodeIndex":1},"weight":"1"},{"start":{"x":529.0116966200333,"y":52.689220058515446,"nodeIndex":1},"end":{"x":524.010600061905,"y":283.6704440926645,"nodeIndex":3},"weight":"1"},{"start":{"x":275.09357296026633,"y":293.6705298276685,"nodeIndex":2},"end":{"x":524.010600061905,"y":283.6704440926645,"nodeIndex":3},"weight":"1"},{"start":{"x":261.0943039990184,"y":51,"nodeIndex":0},"end":{"x":275.09357296026633,"y":293.6705298276685,"nodeIndex":2},"weight":"1"},{"start":{"x":386.0526347901497,"y":173.1300047808519,"nodeIndex":4},"end":{"x":646.9634480623959,"y":177.67987494309193,"nodeIndex":5},"weight":"1"},{"start":{"x":386.0526347901497,"y":173.1300047808519,"nodeIndex":4},"end":{"x":400.0497106351415,"y":415,"nodeIndex":6},"weight":"1"},{"start":{"x":646.9634480623959,"y":177.67987494309193,"nodeIndex":5},"end":{"x":651.9616204655157,"y":410,"nodeIndex":7},"weight":"1"},{"start":{"x":400.0497106351415,"y":415,"nodeIndex":6},"end":{"x":651.9616204655157,"y":410,"nodeIndex":7},"weight":"1"},{"start":{"x":524.010600061905,"y":283.6704440926645,"nodeIndex":3},"end":{"x":651.9616204655157,"y":410,"nodeIndex":7},"weight":""},{"start":{"x":529.0116966200333,"y":52.689220058515446,"nodeIndex":1},"end":{"x":646.9634480623959,"y":177.67987494309193,"nodeIndex":5},"weight":"1"},{"start":{"x":261.0943039990184,"y":51,"nodeIndex":0},"end":{"x":386.0526347901497,"y":173.1300047808519,"nodeIndex":4},"weight":"1"},{"start":{"x":275.09357296026633,"y":293.6705298276685,"nodeIndex":2},"end":{"x":400.0497106351415,"y":415,"nodeIndex":6},"weight":"1"}]}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction isIntersecting(a, b, c, d) {\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\n    function ccw(a, b, c) {\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\n    }\n\n    return (\n        ccw(a, c, d) !== ccw(b, c, d) &&\n        ccw(a, b, c) !== ccw(a, b, d)\n    );\n}\n\n\nfunction hasCommonNode(edgeA, edgeB) {\n    return (\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.end) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.end)\n    );\n}\n\nfunction solutionChecker(data) {\n    const nodes = data.nodes;\n    const edges = data.edges;\n\n    for (let i = 0; i < edges.length; i++) {\n        const edgeA = edges[i];\n        \n        const startA = nodes[edgeA.start.nodeIndex];\n        const endA = nodes[edgeA.end.nodeIndex];\n\n        for (let j = i + 1; j < edges.length; j++) {\n            const edgeB = edges[j];\n\n            const startB = nodes[edgeB.start.nodeIndex];\n            const endB = nodes[edgeB.end.nodeIndex];\n\n            if (\n                isIntersecting(startA, endA, startB, endB) &&\n                !hasCommonNode(edgeA, edgeB)\n            ) {\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\n                return false;\n            }\n        }\n    }\n\n    // No intersections found, it's a plane graph\n    return true;\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{}	{"add_node":{"value":true,"type":"switch"},"delete_node":{"value":true,"type":"switch"},"drag_node":{"value":true,"type":"switch"},"add_edge":{"value":true,"type":"switch"},"delete_edge":{"value":true,"type":"switch"}}	1703588523366	1
6	3 Disks	Move the 3 disks from left peg to right peg. You can use the middle peg to temporarily keep the disks. 	{"numberOfMoves":0,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0,1,2],[],[]]}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.pegs[2].length === 3;\n}\n	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	1703618005679	\N
5	Min 4 Disks	Move the 4 disks from left to right peg in minimum possible moves.	{"numberOfMoves":0,"numberOfDisks":4,"numberOfPegs":3,"pegs":[[0,1,2,3],[],[]]}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.numberOfMoves == 15 && data.pegs[2].length == 4;\n}\n	\N	\N	\N	1703403713674	\N
3	Road Construction	There are 5 cities numbered from 0 to 4. We can construct roads between cities. Each road has a number associated with it denoting the cost to construct a road. We want to minimize our cost. Remove the roads from the given canvas in a way that from every city we can go to every other city and cost of constructing the remaining roads are minimum.	{"nodes":[{"x":191.46353373570471,"y":209.08105010004624,"nodeIndex":0},{"x":480.45356288618734,"y":79.05215958998558,"nodeIndex":1},{"x":717.4589382793936,"y":266.96633313305256,"nodeIndex":2},{"x":440.46237224675286,"y":238.0461718019531,"nodeIndex":3},{"x":415.4808662930142,"y":394.99793083470826,"nodeIndex":4}],"edges":[{"start":{"x":191.46353373570471,"y":209.08105010004624,"nodeIndex":0},"end":{"x":480.45356288618734,"y":79.05215958998558,"nodeIndex":1},"weight":"10"},{"start":{"x":480.45356288618734,"y":79.05215958998558,"nodeIndex":1},"end":{"x":717.4589382793936,"y":266.96633313305256,"nodeIndex":2},"weight":"30"},{"start":{"x":480.45356288618734,"y":79.05215958998558,"nodeIndex":1},"end":{"x":440.46237224675286,"y":238.0461718019531,"nodeIndex":3},"weight":"5"},{"start":{"x":191.46353373570471,"y":209.08105010004624,"nodeIndex":0},"end":{"x":415.4808662930142,"y":394.99793083470826,"nodeIndex":4},"weight":"2"},{"start":{"x":415.4808662930142,"y":394.99793083470826,"nodeIndex":4},"end":{"x":717.4589382793936,"y":266.96633313305256,"nodeIndex":2},"weight":"50"},{"start":{"x":415.4808662930142,"y":394.99793083470826,"nodeIndex":4},"end":{"x":440.46237224675286,"y":238.0461718019531,"nodeIndex":3},"weight":"3"}]}	/**\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const graph = new Map();\n  for (const edge of data.edges) {\n  const { start, end, weight } = edge;\n  \n  if (!graph.has(start.nodeIndex)) {\n    graph.set(start.nodeIndex, []);\n  }\n  \n  if (!graph.has(end.nodeIndex)) {\n    graph.set(end.nodeIndex, []);\n  }\n  \n  graph.get(start.nodeIndex).push({ nodeIndex: end.nodeIndex, weight: parseInt(weight) });\n  graph.get(end.nodeIndex).push({ nodeIndex: start.nodeIndex, weight: parseInt(weight) });\n}\n\n// Step 3: Implement DFS to check if the graph is disconnected\nfunction isDisconnected() {\n  const visited = new Set();\n  const nodes = [...graph.keys()];\n  \n  function dfs(node) {\n    visited.add(node);\n    for (const neighbor of graph.get(node)) {\n      if (!visited.has(neighbor.nodeIndex)) {\n        dfs(neighbor.nodeIndex);\n      }\n    }\n  }\n  \n  dfs(nodes[0]); // Start DFS from the first node\n  \n  return visited.size !== nodes.length;\n}\n\nconst disconnected = isDisconnected();\n\n// Step 4: Calculate the sum of edge weights\nfunction sumEdgeWeights() {\n  let sum = 0;\n  for (const edges of graph.values()) {\n    for (const edge of edges) {\n      sum += edge.weight;\n    }\n  }\n  return sum/2;\n}\n\n\n\n\t// if (disconnected)\n\t// \treturn false;\n\n\t// else {\n  const edgeWeightSum = sumEdgeWeights();\n  console.log(edgeWeightSum);\n\t\tif(edgeWeightSum == 40){\n\t\t\treturn true;\t\n\t\t}\n\t\telse {\n\t\t\treturn false;\n\t\t}\n\t// }\n\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{}	{"add_node":{"value":true,"type":"switch"},"delete_node":{"value":true,"type":"switch"},"drag_node":{"value":true,"type":"switch"},"add_edge":{"value":true,"type":"switch"},"delete_edge":{"value":true,"type":"switch"}}	1703588500618	1
8	Reverse the Disks	Reverse the 3 disks.	{"numberOfMoves":3,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0],[1],[2]]}	function solutionChecker(data) {\n  // Check if the pegs are ordered as 2, 1, 0\n  const isPegsOrdered = data.pegs.map(peg => peg[0]).toString() === "2,1,0";\n  // Check if the number of moves is equal to 3\n  const isNumberOfMovesEqual3 = data.numberOfMoves === 3;\n  // Check both conditions\n  if (isPegsOrdered && isNumberOfMovesEqual3) {\n    console.log("Pegs are ordered as 2, 1, 0, and the number of moves is 3.");\n    return true;\n  } else {\n    console.log("Pegs are not ordered as 2, 1, 0, or the number of moves is not 3.");\n    return false;\n  }\n  }	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	1703618071622	2
\.


--
-- Data for Name: topic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topic (topic_id, name, description, logo) FROM stdin;
6	Graph	Nodes and Edges	https://cdn0.iconfinder.com/data/icons/graph-4/100/graph1-512.png
2	Recursion	\N	https://res.cloudinary.com/practicaldev/image/fetch/s--BWDV0wtG--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/226xc0p9pgtgadnin92j.jpeg
3	Sorting	\N	https://cdn4.vectorstock.com/i/1000x1000/39/13/sorting-elements-vector-4373913.jpg
8	Tree	\N	https://www.crio.do/blog/content/images/size/w1000/2022/02/Types-of-Binary-Trees.png
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

SELECT pg_catalog.setval('public.problem_problem_id_seq', 96, true);


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

SELECT pg_catalog.setval('public.series_series_id_seq', 4, true);


--
-- Name: series_topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.series_topic_id_seq', 1, false);


--
-- Name: state_state_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.state_state_id_seq', 8, true);


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
-- Name: serial serial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.serial
    ADD CONSTRAINT serial_pkey PRIMARY KEY (problem_id, series_id);


--
-- Name: series series_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (series_id);


--
-- Name: state state_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (state_id);


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
-- Name: problem problem_canvas_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problem
    ADD CONSTRAINT problem_canvas_id_fkey FOREIGN KEY (canvas_id) REFERENCES public.canvas(canvas_id) NOT VALID;


--
-- Name: problem problem_series_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problem
    ADD CONSTRAINT problem_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.series(series_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: problem problem_submit_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.problem
    ADD CONSTRAINT problem_submit_state_id_fkey FOREIGN KEY (submit_state_id) REFERENCES public.state(state_id) NOT VALID;


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

