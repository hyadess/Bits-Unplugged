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
-- Name: activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity (
    user_id integer NOT NULL,
    problem_id integer NOT NULL,
    conseq_failed_attempt integer,
    is_solved boolean,
    last_solve_time bigint
);


ALTER TABLE public.activity OWNER TO postgres;

--
-- Name: activity_problem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_problem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_problem_id_seq OWNER TO postgres;

--
-- Name: activity_problem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_problem_id_seq OWNED BY public.activity.problem_id;


--
-- Name: activity_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.activity_user_id_seq OWNER TO postgres;

--
-- Name: activity_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_user_id_seq OWNED BY public.activity.user_id;


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
    template character varying(10000) DEFAULT 'function solutionChecker(data) {}'::character varying
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
    checker_code character varying(10000) DEFAULT 'function solutionChecker(data) {}'::character varying,
    params json,
    ui_params json,
    control_params json,
    canvas_id integer,
    submit_state_id integer,
    serial_no integer DEFAULT 0,
    checker_type integer DEFAULT 0,
    checker_canvas json
);


ALTER TABLE public.problem OWNER TO postgres;

--
-- Name: TABLE problem; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.problem IS '

';


--
-- Name: COLUMN problem.checker_type; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.problem.checker_type IS '0 - checker_code
1 - checker_canvas';


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
    topic_id integer,
    name character varying(30),
    description character varying(1000),
    logo text
);


ALTER TABLE public.series OWNER TO postgres;

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
    checker_code character varying(10000),
    params json,
    ui_params json,
    control_params json,
    last_updated bigint,
    canvas_id integer,
    checker_type integer DEFAULT 0,
    checker_canvas json
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
-- Name: submissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.submissions (
    submission_id integer NOT NULL,
    problem_id integer,
    user_id integer,
    verdict character varying(50),
    time_stamp bigint
);


ALTER TABLE public.submissions OWNER TO postgres;

--
-- Name: submissions_submission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.submissions_submission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.submissions_submission_id_seq OWNER TO postgres;

--
-- Name: submissions_submission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.submissions_submission_id_seq OWNED BY public.submissions.submission_id;


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
-- Name: activity user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity ALTER COLUMN user_id SET DEFAULT nextval('public.activity_user_id_seq'::regclass);


--
-- Name: activity problem_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity ALTER COLUMN problem_id SET DEFAULT nextval('public.activity_problem_id_seq'::regclass);


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
-- Name: profile user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Name: series series_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series ALTER COLUMN series_id SET DEFAULT nextval('public.series_series_id_seq'::regclass);


--
-- Name: state state_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state ALTER COLUMN state_id SET DEFAULT nextval('public.state_state_id_seq'::regclass);


--
-- Name: submissions submission_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissions ALTER COLUMN submission_id SET DEFAULT nextval('public.submissions_submission_id_seq'::regclass);


--
-- Name: topic topic_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic ALTER COLUMN topic_id SET DEFAULT nextval('public.topic_topic_id_seq'::regclass);


--
-- Data for Name: activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activity (user_id, problem_id, conseq_failed_attempt, is_solved, last_solve_time) FROM stdin;
16	68	0	t	1704003973760
1	71	0	t	1704033741412
16	69	1	t	1704034575667
1	70	0	t	1704035500698
1	98	0	t	1704107808391
16	98	0	t	1704227277215
1	30	1	t	1704272233176
16	103	0	t	1704272425648
16	30	1	t	1704280740317
16	70	0	t	1704280770474
16	108	0	t	1704312864310
\.


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
3	Red Black Tree	RbTree	Insert or Delete nodes	https://ds055uzetaobb.cloudfront.net/brioche/uploads/DtAKvHZ65j-rb-1.png?width=1200	{}	{}	{}	function solutionChecker(data) {}
5	Array	ArrayCanvas	\N	https://static.vecteezy.com/system/resources/previews/002/258/426/non_2x/2d-array-outline-icon-item-from-set-dedicated-to-big-data-and-machine-learning-vector.jpg	{}	{}	{}	function solutionChecker(data) {}
1	Graph	GraphComponent	Click anywhere in the canvas to create nodes. Click on two nodes to create an edge between them. You can also drag nodes.	https://cdn0.iconfinder.com/data/icons/graph-4/100/graph1-512.png	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":true,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":true,"type":"switch"},"edit_weight":{"value":false,"type":"switch"},"edit_color":{"value":false,"type":"switch"}}	{}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}
\.


--
-- Data for Name: problem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.problem (problem_id, series_id, author_id, title, statement, canvas_data, is_live, creation_time, checker_code, params, ui_params, control_params, canvas_id, submit_state_id, serial_no, checker_type, checker_canvas) FROM stdin;
68	2	1	Reverse the Disks	Reverse the 3 disks.	{"numberOfMoves":0,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0],[1],[2]]}	f	1700994610385	function solutionChecker(data) {\n  // Check if the pegs are ordered as 2, 1, 0\n  const isPegsOrdered = data.pegs.map(peg => peg[0]).toString() === "2,1,0";\n  // Check if the number of moves is equal to 3\n  const isNumberOfMovesEqual3 = data.numberOfMoves === 3;\n  // Check both conditions\n  if (isPegsOrdered && isNumberOfMovesEqual3) {\n    console.log("Pegs are ordered as 2, 1, 0, and the number of moves is 3.");\n    return true;\n  } else {\n    console.log("Pegs are not ordered as 2, 1, 0, or the number of moves is not 3.");\n    return false;\n  }\n  }	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	2	8	1	1	{"numberOfMoves":3,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[2],[1],[0]]}
36	2	1	Double TOH	Move the disks from left peg to right peg.	{"numberOfMoves":0,"numberOfDisks":10,"numberOfPegs":3,"pegs":[[0,10,2,12,4,14,6,16,8,18],[],[]]}	t	1694059054029	function solutionChecker(data) {\n  return data.numberOfMoves === 2 * (2 ** (data.numberOfDisks/2) - 1);\n}	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	2	2	5	1	{"numberOfMoves":62,"numberOfDisks":10,"numberOfPegs":3,"pegs":[[],[],[10,0,2,12,4,14,6,16,8,18]]}
70	2	1	Min 3 Disks	You already how to move 3 disks from one peg to another. But can you do it in minimum possible moves?	{"numberOfMoves":0,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0,1,2],[],[]]}	t	1701439115392	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.numberOfMoves == 7 && data.pegs[2].length==3;\n}\n	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	2	7	3	1	{"numberOfMoves":7,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[],[],[0,1,2]]}
71	2	1	Min 4 Disks	Move the 4 disks from left to right peg in minimum possible moves.	{"numberOfMoves":0,"numberOfDisks":4,"numberOfPegs":3,"pegs":[[0,1,2,3],[],[]]}	t	1701441086141	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.numberOfMoves == 15 && data.pegs[2].length == 4;\n}\n	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	2	5	4	1	{"numberOfMoves":15,"numberOfDisks":4,"numberOfPegs":3,"pegs":[[],[],[0,1,2,3]]}
69	2	1	3 Disks	Move the 3 disks from left peg to right peg. You can use the middle peg to temporarily keep the disks. 	{"numberOfMoves":0,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0,1,2],[],[]]}	t	1701438806364	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.pegs[2].length === 3;\n}\n	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":false,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	2	6	2	0	\N
108	5	1	Coloring	Draw the graph with only 3 colors. **No nodes should be left to default color.**	{"edges":[{"start":"8","end":"6","weight":"0"},{"start":"6","end":"9","weight":"0"},{"start":"9","end":"5","weight":"0"},{"start":"5","end":"7","weight":"0"},{"start":"7","end":"8","weight":"0"},{"start":"8","end":"3","weight":"0"},{"start":"9","end":"4","weight":"0"},{"start":"7","end":"2","weight":"0"},{"start":"1","end":"6","weight":"0"},{"start":"0","end":"5","weight":"0"},{"start":"0","end":"3","weight":"0"},{"start":"4","end":"2","weight":"0"},{"start":"4","end":"3","weight":"0"},{"start":"0","end":"1","weight":"0"},{"start":"1","end":"2","weight":"0"}],"nodes":{"0":{"x":198.79998779296875,"y":232,"label":"","color":"Default"},"1":{"x":444.79998779296875,"y":39,"label":"","color":"Default"},"2":{"x":683.7999877929688,"y":233,"label":"","color":"Default"},"3":{"x":310.79998779296875,"y":431,"label":"","color":"Default"},"4":{"x":590.7999877929688,"y":428,"label":"","color":"Default"},"5":{"x":311.79998779296875,"y":235,"label":"","color":"Default"},"6":{"x":446.79998779296875,"y":142,"label":"","color":"Default"},"7":{"x":579.7999877929688,"y":235,"label":"","color":"Default"},"8":{"x":362.79998779296875,"y":344,"label":"","color":"Default"},"9":{"x":539.7999877929688,"y":345,"label":"","color":"Default"}},"selectedEdges":[]}	t	1704294858807	/**\r\n *\r\n * @param {Object} data - An object containing nodes and edges properties.\r\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\r\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\r\n * @returns {boolean} True if the solution is valid, otherwise false.\r\n */\r\nfunction solutionChecker(data) {\r\n  // const edges =  data.edges.map(edge => ({\r\n\t// \tstart: edge.start.nodeIndex,\r\n\t// \tend: edge.end.nodeIndex,\r\n\t// \tweight: edge.weight\r\n  // }));\r\n  \r\n\r\n  const allEdgesHaveDifferentColors = data.edges.every(\r\n    edge => data.nodes[edge.start].color !== data.nodes[edge.end].color && data.nodes[edge.end].color !== "Default"); \r\n\r\n  const uniqueColorsSet = new Set();\r\n  data.edges.forEach(edge => {\r\n    uniqueColorsSet.add(data.nodes[edge.start].color);\r\n    uniqueColorsSet.add(data.nodes[edge.end].color);\r\n  });\r\n\r\n  const numberOfUniqueColors = uniqueColorsSet.size;\r\n\r\n  return allEdgesHaveDifferentColors && numberOfUniqueColors == 3;\r\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":false,"type":"switch"}}	{}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":true,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":false,"type":"switch"},"edit_weight":{"value":false,"type":"switch"},"edit_color":{"value":true,"type":"switch"}}	1	12	1	0	\N
99	9	1	Bipartition	Remove minimum possible edges, such that the graph is a bipartite graph.	\N	t	1704109169798	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":false,"type":"switch"}}	{}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":false,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":true,"type":"switch"}}	1	10	1	1	\N
74	4	1	Rearrange	Drag the nodes to make the graph a plane graph. In a plane graph there is no crossing edges.	\N	t	1702049450177	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction isIntersecting(a, b, c, d) {\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\n    function ccw(a, b, c) {\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\n    }\n\n    return (\n        ccw(a, c, d) !== ccw(b, c, d) &&\n        ccw(a, b, c) !== ccw(a, b, d)\n    );\n}\n\n\nfunction hasCommonNode(edgeA, edgeB) {\n    return (\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.end) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.end)\n    );\n}\n\nfunction solutionChecker(data) {\n    const nodes = data.nodes;\n    const edges = data.edges;\n\n    for (let i = 0; i < edges.length; i++) {\n        const edgeA = edges[i];\n        \n        const startA = nodes[edgeA.start.nodeIndex];\n        const endA = nodes[edgeA.end.nodeIndex];\n\n        for (let j = i + 1; j < edges.length; j++) {\n            const edgeB = edges[j];\n\n            const startB = nodes[edgeB.start.nodeIndex];\n            const endB = nodes[edgeB.end.nodeIndex];\n\n            if (\n                isIntersecting(startA, endA, startB, endB) &&\n                !hasCommonNode(edgeA, edgeB)\n            ) {\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\n                return false;\n            }\n        }\n    }\n\n    // No intersections found, it's a plane graph\n    return true;\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":false,"type":"switch"}}	{}	{"add_node":{"value":true,"type":"switch"},"delete_node":{"value":true,"type":"switch"},"drag_node":{"value":true,"type":"switch"},"add_edge":{"value":true,"type":"switch"},"delete_edge":{"value":true,"type":"switch"}}	1	4	1	0	\N
98	8	1	Shorter Path	Select the edges that forms the shortest path from 0 to 6.	{"edges":[{"start":"0","end":"1","weight":"4"},{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"},{"start":"3","end":"1","weight":"3"},{"start":"1","end":"4","weight":"4"},{"start":"6","end":"5","weight":"8"},{"start":"2","end":"5","weight":"6"}],"nodes":{"0":{"x":125.60000610351562,"y":202.26666259765625},"1":{"x":298.6000061035156,"y":71.26666259765625},"2":{"x":271.6000061035156,"y":376.26666259765625},"3":{"x":435.6000061035156,"y":236.26666259765625},"4":{"x":561.6000061035156,"y":64.26666259765625},"5":{"x":600.6000061035156,"y":377.26666259765625},"6":{"x":747.6000061035156,"y":198.26666259765625}},"selectedEdges":[]}	t	1704106904024	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":false,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":true,"type":"switch"}}	1	9	1	1	{"edges":[{"start":"0","end":"1","weight":"4"},{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"},{"start":"3","end":"1","weight":"3"},{"start":"1","end":"4","weight":"4"},{"start":"6","end":"5","weight":"8"},{"start":"2","end":"5","weight":"6"}],"nodes":{"0":{"x":125.60000610351562,"y":202.26666259765625},"1":{"x":298.6000061035156,"y":71.26666259765625},"2":{"x":271.6000061035156,"y":376.26666259765625},"3":{"x":435.6000061035156,"y":236.26666259765625},"4":{"x":561.6000061035156,"y":64.26666259765625},"5":{"x":600.6000061035156,"y":377.26666259765625},"6":{"x":747.6000061035156,"y":198.26666259765625}},"selectedEdges":[{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"}]}
106	\N	1	Pentagon and Pentagram	Convert the Pentagram to a Pentagon.	{"edges":[{"start":"3","end":"0","weight":"0"},{"start":"0","end":"4","weight":"0"},{"start":"2","end":"4","weight":"0"},{"start":"1","end":"2","weight":"0"},{"start":"3","end":"1","weight":"0"}],"nodes":{"0":{"x":430.79998779296875,"y":40.19999694824219,"label":""},"1":{"x":599.7999877929688,"y":145.1999969482422,"label":""},"2":{"x":274.79998779296875,"y":146.1999969482422,"label":""},"3":{"x":324.79998779296875,"y":330.1999969482422,"label":""},"4":{"x":545.7999877929688,"y":332.1999969482422,"label":""}},"selectedEdges":[]}	f	1704286616591	/**\r\n *\r\n * @param {Object} data - An object containing nodes and edges properties.\r\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\r\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\r\n * @returns {boolean} True if the solution is valid, otherwise false.\r\n */\r\n\r\nfunction isIntersecting(a, b, c, d) {\r\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\r\n    function ccw(a, b, c) {\r\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\r\n    }\r\n\r\n    return (\r\n        ccw(a, c, d) !== ccw(b, c, d) &&\r\n        ccw(a, b, c) !== ccw(a, b, d)\r\n    );\r\n}\r\n\r\n\r\nfunction hasCommonNode(edgeA, edgeB) {\r\n    return (\r\n        edgeA.start === edgeB.start ||\r\n        edgeA.start === edgeB.end ||\r\n        edgeA.end === edgeB.start ||\r\n        edgeA.end === edgeB.end\r\n    );\r\n}\r\n\r\nfunction solutionChecker(data) {\r\n    const nodes = data.nodes;\r\n    const edges = data.edges;\r\n\r\n    for (let i = 0; i < edges.length; i++) {\r\n        const edgeA = edges[i];\r\n        \r\n        const startA = nodes[edgeA.start];\r\n        const endA = nodes[edgeA.end];\r\n\r\n        for (let j = i + 1; j < edges.length; j++) {\r\n            const edgeB = edges[j];\r\n\r\n            const startB = nodes[edgeB.start];\r\n            const endB = nodes[edgeB.end];\r\n\r\n            if (\r\n                isIntersecting(startA, endA, startB, endB) &&\r\n                !hasCommonNode(edgeA, edgeB)\r\n            ) {\r\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\r\n                return false;\r\n            }\r\n        }\r\n    }\r\n\r\n    // No intersections found, it's a plane graph\r\n    return true;\r\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":false,"type":"switch"}}	{}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":true,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":false,"type":"switch"},"edit_weight":{"value":false,"type":"switch"}}	1	\N	0	0	\N
103	1	1	Road Construction 2	Similar to version 1.	{"edges":[{"start":"0","end":"1","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"5","end":"3","weight":"5"},{"start":"5","end":"2","weight":"5"},{"start":"0","end":"5","weight":"5"},{"start":"1","end":"5","weight":"5"},{"start":"5","end":"4","weight":"5"},{"start":"5","end":"6","weight":"5"}],"nodes":{"0":{"x":142,"y":196,"label":0},"1":{"x":274,"y":45,"label":1},"2":{"x":284,"y":357,"label":2},"3":{"x":492,"y":358,"label":3},"4":{"x":498,"y":41,"label":4},"5":{"x":391,"y":197,"label":5},"6":{"x":652,"y":205,"label":6}},"selectedEdges":[]}	t	1704230123238	/**\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction createGraph(edges) {\n  const graph = new Map();\n  for (const edge of edges) {\n    const { start, end, weight } = edge;\n\n    if (!graph.has(start)) {\n      graph.set(start, []);\n    }\n\n    if (!graph.has(end)) {\n      graph.set(end, []);\n    }\n\n    graph.get(start).push({ value: end, weight: parseInt(weight) });\n    graph.get(end).push({ value: start, weight: parseInt(weight) });\n  }\n  return graph;\n}\nfunction getCost(graph) {\n  // Step 3: Implement DFS to check if the graph is disconnected\n  function isDisconnected() {\n    const visited = new Set();\n    const nodes = [...graph.keys()];\n\n    function dfs(node) {\n      visited.add(node);\n      for (const neighbor of graph.get(node)) {\n        if (!visited.has(neighbor.value)) {\n          dfs(neighbor.value);\n        }\n      }\n    }\n    dfs(nodes[0]); // Start DFS from the first node\n    return visited.size !== nodes.length;\n  }\n\n  const disconnected = isDisconnected();\n\n  // Step 4: Calculate the sum of edge weights\n  function sumEdgeWeights() {\n    let sum = 0;\n    for (const edges of graph.values()) {\n      for (const edge of edges) {\n        sum += edge.weight;\n      }\n    }\n    return sum / 2;\n  }\n\n  if (disconnected) return -1;\n\n  const edgeWeightSum = sumEdgeWeights();\n  return edgeWeightSum;\n}\nfunction solutionChecker(user_data, solution_data) {\n  const user_graph = createGraph(user_data.selectedEdges);\n  const setter_graph = createGraph(solution_data.selectedEdges);\n\n  if (Object.keys(user_graph).length !== Object.keys(user_graph).length)\n    return false;\n  const user_cost = getCost(user_graph);\n  const setter_cost = getCost(setter_graph);\n  console.log(user_cost);\n  if (user_cost !== -1 && user_cost === setter_cost) {\n    return true;\n  } else {\n    return false;\n  }\n}\n	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":false,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":false,"type":"switch"},"edit_weight":{"value":false,"type":"switch"}}	1	11	2	1	{"edges":[{"start":"0","end":"1","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"5","end":"3","weight":"5"},{"start":"5","end":"2","weight":"5"},{"start":"0","end":"5","weight":"5"},{"start":"1","end":"5","weight":"5"},{"start":"5","end":"4","weight":"5"},{"start":"5","end":"6","weight":"5"}],"nodes":{"0":{"x":142,"y":196,"label":0},"1":{"x":274,"y":45,"label":1},"2":{"x":284,"y":357,"label":2},"3":{"x":492,"y":358,"label":3},"4":{"x":498,"y":41,"label":4},"5":{"x":391,"y":197,"label":5},"6":{"x":652,"y":205,"label":6}},"selectedEdges":[{"start":"0","end":"1","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"5","end":"2","weight":"5"}]}
30	1	1	Road Construction	There are 5 cities numbered from 0 to 4. We can construct roads between cities. Each road has a number associated with it denoting the cost to construct a road. We want to minimize our cost. **Select the roads from the given canvas in a way that from every city we can go to every other city and cost of constructing the roads are minimum.**	{"edges":[{"start":"0","end":"1","weight":"10"},{"start":"3","end":"1","weight":"5"},{"start":"1","end":"2","weight":"30"},{"start":"0","end":"4","weight":"2"},{"start":"4","end":"3","weight":"3"},{"start":"4","end":"2","weight":"50"}],"nodes":{"0":{"x":159,"y":218.8000030517578,"label":0},"1":{"x":386,"y":87.80000305175781,"label":1},"2":{"x":628,"y":217.8000030517578,"label":2},"3":{"x":387,"y":234.8000030517578,"label":3},"4":{"x":392,"y":396.8000030517578,"label":4}},"selectedEdges":[]}	t	1694032352472	/**\n * @param {Object} data (user_data/solution_data) - An object containing nodes and edges properties.\n * @param {Array} data.nodes - HashMap of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end, weight properties.\n * @param {Array} data.selectedEdges - Array of selectedEdges. Where each edge is an object with start, end, weight properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(user_data, solution_data) {\n  return JSON.stringify(user_data) === JSON.stringify(solution_data);\n}\n	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":false,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":false,"type":"switch"},"edit_weight":{"value":false,"type":"switch"}}	1	3	1	1	{"edges":[{"start":"0","end":"1","weight":"10"},{"start":"3","end":"1","weight":"5"},{"start":"1","end":"2","weight":"30"},{"start":"0","end":"4","weight":"2"},{"start":"4","end":"3","weight":"3"},{"start":"4","end":"2","weight":"50"}],"nodes":{"0":{"x":159,"y":218.8000030517578,"label":0},"1":{"x":386,"y":87.80000305175781,"label":1},"2":{"x":628,"y":217.8000030517578,"label":2},"3":{"x":387,"y":234.8000030517578,"label":3},"4":{"x":392,"y":396.8000030517578,"label":4}},"selectedEdges":[{"start":"0","end":"4","weight":"2"},{"start":"1","end":"2","weight":"30"},{"start":"3","end":"1","weight":"5"},{"start":"4","end":"3","weight":"3"}]}
109	\N	1	assa		\N	f	1704299670539	function solutionChecker(data) {}	\N	\N	\N	\N	\N	0	0	\N
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
-- Data for Name: series; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.series (series_id, topic_id, name, description, logo) FROM stdin;
3	8	Red Black	\N	https://ds055uzetaobb.cloudfront.net/brioche/uploads/DtAKvHZ65j-rb-1.png?width=1200
12	6	BFS	\N	https://miro.medium.com/v2/resize:fit:4800/format:webp/1*fYKrGW0IUeoS_8XtCoNaLw.gif
11	6	Max Flow Min Cut	\N	https://uploads.toptal.io/blog/image/124061/toptal-blog-image-1503922944233-918c6faefd88554e45442287ce635def.gif
13	3	Bubble Sort	\N	https://res.cloudinary.com/practicaldev/image/fetch/s--tZV8xTN4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.imgur.com/p36pPuu.gif
14	3	Selection Sort	\N	https://res.cloudinary.com/practicaldev/image/fetch/s--6bITq5rX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://i0.wp.com/algorithms.tutorialhorizon.com/files/2019/01/Selection-Sort-Gif.gif%3Fzoom%3D1.25%26fit%3D300%252C214%26ssl%3D1
15	3	Quick Sort	\N	https://assets.digitalocean.com/articles/alligator/js/quick-sort/quick-sort-animation.gif
16	3	Merge Sort	\N	https://assets.digitalocean.com/articles/alligator/js/understanding-merge-sort/merge-sort-animation.gif
2	2	Tower Of Hanoi	\N	/gifs/toh_light.gif
7	2	N Queen	\N	https://meetwithbudhi.files.wordpress.com/2019/09/prog.gif
8	6	Shortest Path	\N	https://www.get-digital-help.com/wp-content/uploads/2014/05/Find-shortest-path4.gif
9	6	Bipartite Graph	\N	https://miro.medium.com/v2/resize:fit:588/0*PWKRBToddj9I36q4.gif
1	6	Minimum Spanning Tree		https://blog-c7ff.kxcdn.com/blog/wp-content/uploads/2017/01/blog-10.jpg
5	6	Graph Coloring	\N	https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Petersen_graph_3-coloring.svg/800px-Petersen_graph_3-coloring.svg.png
4	6	Planar Graph	\N	https://miro.medium.com/v2/resize:fit:1400/1*Xo-W6UucD0e2gmOB5wescg.gif
10	6	Isomorphism	\N	https://images.squarespace-cdn.com/content/v1/52b30f7ae4b067ba989438d4/1419401410738-XTMSALY9255E01WH06Y1/image-asset.gif
\.


--
-- Data for Name: state; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.state (state_id, title, statement, canvas_data, checker_code, params, ui_params, control_params, last_updated, canvas_id, checker_type, checker_canvas) FROM stdin;
2	Double TOH	Move the disks from left peg to right peg.	{"numberOfMoves":0,"numberOfDisks":10,"numberOfPegs":3,"pegs":[[0,10,2,12,4,14,6,16,8,18],[],[]]}	function solutionChecker(data) {\n  return data.numberOfMoves === 2 * (2 ** (data.numberOfDisks/2) - 1);\n}	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	1704035744956	2	1	{"numberOfMoves":62,"numberOfDisks":10,"numberOfPegs":3,"pegs":[[],[],[10,0,2,12,4,14,6,16,8,18]]}
6	3 Disks	Move the 3 disks from left peg to right peg. You can use the middle peg to temporarily keep the disks. 	{"numberOfMoves":0,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0,1,2],[],[]]}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.pegs[2].length === 3;\n}\n	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":false,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	1703962294639	2	0	\N
5	Min 4 Disks	Move the 4 disks from left to right peg in minimum possible moves.	{"numberOfMoves":0,"numberOfDisks":4,"numberOfPegs":3,"pegs":[[0,1,2,3],[],[]]}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.numberOfMoves == 15 && data.pegs[2].length == 4;\n}\n	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	1704035730313	2	1	{"numberOfMoves":15,"numberOfDisks":4,"numberOfPegs":3,"pegs":[[],[],[0,1,2,3]]}
7	Min 3 Disks	You already know how to move 3 disks from one peg to another. But can you do it in minimum possible moves?	{"numberOfMoves":0,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0,1,2],[],[]]}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  return data.numberOfMoves == 7 && data.pegs[2].length==3;\n}\n	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	1704035688638	2	1	{"numberOfMoves":7,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[],[],[0,1,2]]}
8	Reverse the Disks	Reverse the 3 disks.	{"numberOfMoves":3,"numberOfDisks":3,"numberOfPegs":3,"pegs":[[0],[1],[2]]}	function solutionChecker(data) {\n  // Check if the pegs are ordered as 2, 1, 0\n  const isPegsOrdered = data.pegs.map(peg => peg[0]).toString() === "2,1,0";\n  // Check if the number of moves is equal to 3\n  const isNumberOfMovesEqual3 = data.numberOfMoves === 3;\n  // Check both conditions\n  if (isPegsOrdered && isNumberOfMovesEqual3) {\n    console.log("Pegs are ordered as 2, 1, 0, and the number of moves is 3.");\n    return true;\n  } else {\n    console.log("Pegs are not ordered as 2, 1, 0, or the number of moves is not 3.");\n    return false;\n  }\n  }	{"custom_disk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"n_disks":{"value":false,"type":"switch"},"custom_disk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	{}	1703618071622	2	0	\N
9	Shorter Path	Select the edges that forms the shortest path from 0 to 6.	{"edges":[{"start":"0","end":"1","weight":"4"},{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"},{"start":"3","end":"1","weight":"3"},{"start":"1","end":"4","weight":"4"},{"start":"6","end":"5","weight":"8"},{"start":"2","end":"5","weight":"6"}],"nodes":{"0":{"x":125.60000610351562,"y":202.26666259765625},"1":{"x":298.6000061035156,"y":71.26666259765625},"2":{"x":271.6000061035156,"y":376.26666259765625},"3":{"x":435.6000061035156,"y":236.26666259765625},"4":{"x":561.6000061035156,"y":64.26666259765625},"5":{"x":600.6000061035156,"y":377.26666259765625},"6":{"x":747.6000061035156,"y":198.26666259765625}},"selectedEdges":[]}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":false,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":true,"type":"switch"}}	1704227177171	1	1	{"edges":[{"start":"0","end":"1","weight":"4"},{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"},{"start":"3","end":"1","weight":"3"},{"start":"1","end":"4","weight":"4"},{"start":"6","end":"5","weight":"8"},{"start":"2","end":"5","weight":"6"}],"nodes":{"0":{"x":125.60000610351562,"y":202.26666259765625},"1":{"x":298.6000061035156,"y":71.26666259765625},"2":{"x":271.6000061035156,"y":376.26666259765625},"3":{"x":435.6000061035156,"y":236.26666259765625},"4":{"x":561.6000061035156,"y":64.26666259765625},"5":{"x":600.6000061035156,"y":377.26666259765625},"6":{"x":747.6000061035156,"y":198.26666259765625}},"selectedEdges":[{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"}]}
4	Rearrange	Drag the nodes to make the graph a plane graph. In a plane graph there is no crossing edges.	{"edges":[{"start":"0","end":"1","weight":"0"},{"start":"2","end":"3","weight":"0"},{"start":"3","end":"1","weight":"0"},{"start":"0","end":"2","weight":"0"},{"start":"4","end":"5","weight":"0"},{"start":"5","end":"7","weight":"0"},{"start":"7","end":"6","weight":"0"},{"start":"4","end":"6","weight":"0"},{"start":"1","end":"5","weight":"0"},{"start":"0","end":"4","weight":"0"},{"start":"2","end":"6","weight":"0"},{"start":"3","end":"7","weight":"0"}],"nodes":{"0":{"x":254.60000610351562,"y":85.26666259765625},"1":{"x":473.6000061035156,"y":78.26666259765625},"2":{"x":253.60000610351562,"y":260.26666259765625},"3":{"x":469.6000061035156,"y":268.26666259765625},"4":{"x":368.6000061035156,"y":167.26666259765625},"5":{"x":613.6000061035156,"y":152.26666259765625},"6":{"x":353.6000061035156,"y":372.26666259765625},"7":{"x":616.6000061035156,"y":366.26666259765625}}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction isIntersecting(a, b, c, d) {\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\n    function ccw(a, b, c) {\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\n    }\n\n    return (\n        ccw(a, c, d) !== ccw(b, c, d) &&\n        ccw(a, b, c) !== ccw(a, b, d)\n    );\n}\n\n\nfunction hasCommonNode(edgeA, edgeB) {\n    return (\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.end) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.end)\n    );\n}\n\nfunction solutionChecker(data) {\n    const nodes = data.nodes;\n    const edges = data.edges;\n\n    for (let i = 0; i < edges.length; i++) {\n        const edgeA = edges[i];\n        \n        const startA = nodes[edgeA.start.nodeIndex];\n        const endA = nodes[edgeA.end.nodeIndex];\n\n        for (let j = i + 1; j < edges.length; j++) {\n            const edgeB = edges[j];\n\n            const startB = nodes[edgeB.start.nodeIndex];\n            const endB = nodes[edgeB.end.nodeIndex];\n\n            if (\n                isIntersecting(startA, endA, startB, endB) &&\n                !hasCommonNode(edgeA, edgeB)\n            ) {\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\n                return false;\n            }\n        }\n    }\n\n    // No intersections found, it's a plane graph\n    return true;\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":false,"type":"switch"}}	{}	{"add_node":{"value":true,"type":"switch"},"delete_node":{"value":true,"type":"switch"},"drag_node":{"value":true,"type":"switch"},"add_edge":{"value":true,"type":"switch"},"delete_edge":{"value":true,"type":"switch"}}	1704218498511	1	0	\N
10	Bipartition	Remove minimum possible edges, such that the graph is a bipartite graph.	{"edges":[{"start":"0","end":"5","weight":"0"},{"start":"3","end":"2","weight":"0"},{"start":"1","end":"3","weight":"0"},{"start":"1","end":"5","weight":"0"},{"start":"4","end":"5","weight":"0"},{"start":"3","end":"4","weight":"0"},{"start":"0","end":"3","weight":"0"},{"start":"1","end":"4","weight":"0"}],"nodes":{"0":{"x":278.6000061035156,"y":78.26666259765625},"1":{"x":419.6000061035156,"y":219.26666259765625},"2":{"x":571.6000061035156,"y":338.26666259765625},"3":{"x":537.6000061035156,"y":73.26666259765625},"4":{"x":193.60000610351562,"y":199.26666259765625},"5":{"x":353.6000061035156,"y":359.26666259765625}}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start.nodeIndex,\n\t\tend: edge.end.nodeIndex,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":false,"type":"switch"}}	{}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":false,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":true,"type":"switch"}}	1704218544517	1	1	{"edges":[{"start":"0","end":"5","weight":"0"},{"start":"3","end":"2","weight":"0"},{"start":"1","end":"3","weight":"0"},{"start":"1","end":"5","weight":"0"},{"start":"0","end":"3","weight":"0"},{"start":"1","end":"4","weight":"0"}],"nodes":{"0":{"x":278.6000061035156,"y":78.26666259765625},"1":{"x":419.6000061035156,"y":219.26666259765625},"2":{"x":571.6000061035156,"y":338.26666259765625},"3":{"x":537.6000061035156,"y":73.26666259765625},"4":{"x":193.60000610351562,"y":199.26666259765625},"5":{"x":353.6000061035156,"y":359.26666259765625}}}
11	Road Construction 2	Similar to version 1.	{"edges":[{"start":"0","end":"1","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"5","end":"3","weight":"5"},{"start":"5","end":"2","weight":"5"},{"start":"0","end":"5","weight":"5"},{"start":"1","end":"5","weight":"5"},{"start":"5","end":"4","weight":"5"},{"start":"5","end":"6","weight":"5"}],"nodes":{"0":{"x":142,"y":196,"label":0},"1":{"x":274,"y":45,"label":1},"2":{"x":284,"y":357,"label":2},"3":{"x":492,"y":358,"label":3},"4":{"x":498,"y":41,"label":4},"5":{"x":391,"y":197,"label":5},"6":{"x":652,"y":205,"label":6}},"selectedEdges":[]}	/**\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction createGraph(edges) {\n  const graph = new Map();\n  for (const edge of edges) {\n    const { start, end, weight } = edge;\n\n    if (!graph.has(start)) {\n      graph.set(start, []);\n    }\n\n    if (!graph.has(end)) {\n      graph.set(end, []);\n    }\n\n    graph.get(start).push({ value: end, weight: parseInt(weight) });\n    graph.get(end).push({ value: start, weight: parseInt(weight) });\n  }\n  return graph;\n}\nfunction getCost(graph) {\n  // Step 3: Implement DFS to check if the graph is disconnected\n  function isDisconnected() {\n    const visited = new Set();\n    const nodes = [...graph.keys()];\n\n    function dfs(node) {\n      visited.add(node);\n      for (const neighbor of graph.get(node)) {\n        if (!visited.has(neighbor.value)) {\n          dfs(neighbor.value);\n        }\n      }\n    }\n    dfs(nodes[0]); // Start DFS from the first node\n    return visited.size !== nodes.length;\n  }\n\n  const disconnected = isDisconnected();\n\n  // Step 4: Calculate the sum of edge weights\n  function sumEdgeWeights() {\n    let sum = 0;\n    for (const edges of graph.values()) {\n      for (const edge of edges) {\n        sum += edge.weight;\n      }\n    }\n    return sum / 2;\n  }\n\n  if (disconnected) return -1;\n\n  const edgeWeightSum = sumEdgeWeights();\n  return edgeWeightSum;\n}\nfunction solutionChecker(user_data, solution_data) {\n  const user_graph = createGraph(user_data.selectedEdges);\n  const setter_graph = createGraph(solution_data.selectedEdges);\n\n  if (Object.keys(user_graph).length !== Object.keys(user_graph).length)\n    return false;\n  const user_cost = getCost(user_graph);\n  const setter_cost = getCost(setter_graph);\n  console.log(user_cost);\n  if (user_cost !== -1 && user_cost === setter_cost) {\n    return true;\n  } else {\n    return false;\n  }\n}\n	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":false,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":false,"type":"switch"},"edit_weight":{"value":false,"type":"switch"}}	1704281295961	1	1	{"edges":[{"start":"0","end":"1","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"5","end":"3","weight":"5"},{"start":"5","end":"2","weight":"5"},{"start":"0","end":"5","weight":"5"},{"start":"1","end":"5","weight":"5"},{"start":"5","end":"4","weight":"5"},{"start":"5","end":"6","weight":"5"}],"nodes":{"0":{"x":142,"y":196,"label":0},"1":{"x":274,"y":45,"label":1},"2":{"x":284,"y":357,"label":2},"3":{"x":492,"y":358,"label":3},"4":{"x":498,"y":41,"label":4},"5":{"x":391,"y":197,"label":5},"6":{"x":652,"y":205,"label":6}},"selectedEdges":[{"start":"0","end":"1","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"5","end":"2","weight":"5"}]}
3	Road Construction	There are 5 cities numbered from 0 to 4. We can construct roads between cities. Each road has a number associated with it denoting the cost to construct a road. We want to minimize our cost. **Select the roads from the given canvas in a way that from every city we can go to every other city and cost of constructing the roads are minimum.**	{"edges":[{"start":"0","end":"1","weight":"10"},{"start":"3","end":"1","weight":"5"},{"start":"1","end":"2","weight":"30"},{"start":"0","end":"4","weight":"2"},{"start":"4","end":"3","weight":"3"},{"start":"4","end":"2","weight":"50"}],"nodes":{"0":{"x":159,"y":218.8000030517578,"label":0},"1":{"x":386,"y":87.80000305175781,"label":1},"2":{"x":628,"y":217.8000030517578,"label":2},"3":{"x":387,"y":234.8000030517578,"label":3},"4":{"x":392,"y":396.8000030517578,"label":4}},"selectedEdges":[]}	/**\n * @param {Object} data (user_data/solution_data) - An object containing nodes and edges properties.\n * @param {Array} data.nodes - HashMap of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end, weight properties.\n * @param {Array} data.selectedEdges - Array of selectedEdges. Where each edge is an object with start, end, weight properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(user_data, solution_data) {\n  return JSON.stringify(user_data) === JSON.stringify(solution_data);\n}\n	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":true,"type":"switch"}}	{}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":false,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":false,"type":"switch"},"edit_weight":{"value":false,"type":"switch"}}	1704272294012	1	1	{"edges":[{"start":"0","end":"1","weight":"10"},{"start":"3","end":"1","weight":"5"},{"start":"1","end":"2","weight":"30"},{"start":"0","end":"4","weight":"2"},{"start":"4","end":"3","weight":"3"},{"start":"4","end":"2","weight":"50"}],"nodes":{"0":{"x":159,"y":218.8000030517578,"label":0},"1":{"x":386,"y":87.80000305175781,"label":1},"2":{"x":628,"y":217.8000030517578,"label":2},"3":{"x":387,"y":234.8000030517578,"label":3},"4":{"x":392,"y":396.8000030517578,"label":4}},"selectedEdges":[{"start":"0","end":"4","weight":"2"},{"start":"1","end":"2","weight":"30"},{"start":"3","end":"1","weight":"5"},{"start":"4","end":"3","weight":"3"}]}
12	Coloring	Draw the graph with only 3 colors. **No nodes should be left to default color.**	{"edges":[{"start":"8","end":"6","weight":"0"},{"start":"6","end":"9","weight":"0"},{"start":"9","end":"5","weight":"0"},{"start":"5","end":"7","weight":"0"},{"start":"7","end":"8","weight":"0"},{"start":"8","end":"3","weight":"0"},{"start":"9","end":"4","weight":"0"},{"start":"7","end":"2","weight":"0"},{"start":"1","end":"6","weight":"0"},{"start":"0","end":"5","weight":"0"},{"start":"0","end":"3","weight":"0"},{"start":"4","end":"2","weight":"0"},{"start":"4","end":"3","weight":"0"},{"start":"0","end":"1","weight":"0"},{"start":"1","end":"2","weight":"0"}],"nodes":{"0":{"x":198.79998779296875,"y":232,"label":"","color":"Default"},"1":{"x":444.79998779296875,"y":39,"label":"","color":"Default"},"2":{"x":683.7999877929688,"y":233,"label":"","color":"Default"},"3":{"x":310.79998779296875,"y":431,"label":"","color":"Default"},"4":{"x":590.7999877929688,"y":428,"label":"","color":"Default"},"5":{"x":311.79998779296875,"y":235,"label":"","color":"Default"},"6":{"x":446.79998779296875,"y":142,"label":"","color":"Default"},"7":{"x":579.7999877929688,"y":235,"label":"","color":"Default"},"8":{"x":362.79998779296875,"y":344,"label":"","color":"Default"},"9":{"x":539.7999877929688,"y":345,"label":"","color":"Default"}},"selectedEdges":[]}	/**\r\n *\r\n * @param {Object} data - An object containing nodes and edges properties.\r\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\r\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\r\n * @returns {boolean} True if the solution is valid, otherwise false.\r\n */\r\nfunction solutionChecker(data) {\r\n  // const edges =  data.edges.map(edge => ({\r\n\t// \tstart: edge.start.nodeIndex,\r\n\t// \tend: edge.end.nodeIndex,\r\n\t// \tweight: edge.weight\r\n  // }));\r\n  \r\n\r\n  const allEdgesHaveDifferentColors = data.edges.every(\r\n    edge => data.nodes[edge.start].color !== data.nodes[edge.end].color && data.nodes[edge.end].color !== "Default"); \r\n\r\n  const uniqueColorsSet = new Set();\r\n  data.edges.forEach(edge => {\r\n    uniqueColorsSet.add(data.nodes[edge.start].color);\r\n    uniqueColorsSet.add(data.nodes[edge.end].color);\r\n  });\r\n\r\n  const numberOfUniqueColors = uniqueColorsSet.size;\r\n\r\n  return allEdgesHaveDifferentColors && numberOfUniqueColors == 3;\r\n}	{"variant":{"value":"simple_graph","type":"select","list":["simple_graph","tree"]},"directed_edge":{"value":false,"type":"switch"},"weighted_edge":{"value":false,"type":"switch"}}	{}	{"add_node":{"value":false,"type":"switch"},"delete_node":{"value":false,"type":"switch"},"drag_node":{"value":true,"type":"switch"},"add_edge":{"value":false,"type":"switch"},"delete_edge":{"value":false,"type":"switch"},"edit_weight":{"value":false,"type":"switch"},"edit_color":{"value":true,"type":"switch"}}	1704312743030	1	0	\N
\.


--
-- Data for Name: submissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.submissions (submission_id, problem_id, user_id, verdict, time_stamp) FROM stdin;
1	68	16	Wrong answer	1704002979513
2	68	16	Accepted	1704002999602
3	70	16	Wrong answer	1704003096052
4	70	16	Accepted	1704003263927
5	68	16	Wrong answer	1704003969494
6	68	16	Accepted	1704003973755
7	30	16	Accepted	1704010521922
8	30	1	solutionChecker is not defined	1704013305378
9	30	1	Accepted	1704013438482
10	30	1	Wrong answer	1704013442217
11	30	1	Wrong answer	1704019049263
12	30	1	Wrong answer	1704019056293
13	30	1	Accepted	1704019060949
14	70	1	Wrong answer	1704033578097
15	70	1	Wrong answer	1704033594944
16	70	1	Accepted	1704033607948
17	71	1	Accepted	1704033740386
18	69	16	Accepted	1704034566964
19	69	16	Wrong answer	1704034576690
20	70	16	Wrong answer	1704034609764
21	70	16	Wrong answer	1704035334206
22	70	16	Wrong answer	1704035449741
23	70	1	Accepted	1704035500703
24	70	16	Accepted	1704035841622
25	30	16	Wrong answer	1704036317545
26	30	16	Accepted	1704036438061
27	98	1	Accepted	1704107808389
28	98	16	Wrong answer	1704108517513
29	98	16	Accepted	1704108766649
30	30	1	Accepted	1704224107185
31	30	16	Accepted	1704225471671
32	98	16	Accepted	1704225621164
33	30	16	Wrong answer	1704226039274
34	30	1	Accepted	1704226069010
35	30	16	Accepted	1704226091621
36	98	16	Accepted	1704226105007
37	30	16	Wrong answer	1704226119730
38	30	16	Accepted	1704227251971
39	98	16	Wrong answer	1704227272477
40	98	16	Accepted	1704227277217
41	30	16	data.edges is undefined	1704232461530
42	30	16	Wrong answer	1704232531073
43	30	16	Wrong answer	1704232605401
44	30	1	Wrong answer	1704232680372
45	30	1	Wrong answer	1704232698205
46	30	1	Accepted	1704232711402
47	30	16	Accepted	1704262514794
48	30	16	Wrong answer	1704272194639
49	30	16	Wrong answer	1704272201885
50	30	1	Wrong answer	1704272233722
51	30	16	Accepted	1704272394346
52	103	16	Accepted	1704272425855
53	30	16	Wrong answer	1704280361662
54	30	16	Accepted	1704280364061
55	30	16	Wrong answer	1704280740310
56	70	16	Accepted	1704280770456
57	108	16	solutionChecker is not defined	1704312595019
58	108	16	Wrong answer	1704312800204
59	108	16	Accepted	1704312864298
\.


--
-- Data for Name: topic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topic (topic_id, name, description, logo) FROM stdin;
6	Graph	Nodes and Edges	https://cdn0.iconfinder.com/data/icons/graph-4/100/graph1-512.png
3	Sorting	\N	https://upload.wikimedia.org/wikipedia/commons/e/ef/Sorting_shaker_sort_anim.gif
2	Recursion	\N	https://i.pinimg.com/originals/a1/2b/a8/a12ba80f3701ef4e7014001e6c1869ac.gif
8	Tree	\N	https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS7-pjys5IOotbaoxbBlxDklbg6YEPMwLcS0GOlOgRtEBWP_bQU
\.


--
-- Name: Author_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Author_author_id_seq"', 6, true);


--
-- Name: activity_problem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_problem_id_seq', 1, false);


--
-- Name: activity_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_user_id_seq', 1, false);


--
-- Name: auth_auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_auth_id_seq', 1, true);


--
-- Name: canvas_canvas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.canvas_canvas_id_seq', 7, true);


--
-- Name: problem_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.problem_author_id_seq', 1, false);


--
-- Name: problem_problem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.problem_problem_id_seq', 109, true);


--
-- Name: problem_series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.problem_series_id_seq', 1, false);


--
-- Name: series_series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.series_series_id_seq', 16, true);


--
-- Name: series_topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.series_topic_id_seq', 1, false);


--
-- Name: state_state_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.state_state_id_seq', 12, true);


--
-- Name: submissions_submission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.submissions_submission_id_seq', 59, true);


--
-- Name: topic_topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topic_topic_id_seq', 9, true);


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
-- Name: state state_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_pkey PRIMARY KEY (state_id);


--
-- Name: submissions submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_pkey PRIMARY KEY (submission_id);


--
-- Name: topic topic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT topic_pkey PRIMARY KEY (topic_id);


--
-- Name: activity userActivity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT "userActivity_pkey" PRIMARY KEY (user_id, problem_id);


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
-- Name: series series_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topic(topic_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: submissions submissions_problem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_problem_id_fkey FOREIGN KEY (problem_id) REFERENCES public.problem(problem_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: submissions submissions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profile(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: activity userActivity_problem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT "userActivity_problem_id_fkey" FOREIGN KEY (problem_id) REFERENCES public.problem(problem_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: activity userActivity_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT "userActivity_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profile(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

