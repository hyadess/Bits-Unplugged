--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.5

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
-- Name: copy_problem_to_version(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.copy_problem_to_version() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      DECLARE
        problem_row "Problems"%ROWTYPE;
        next_version integer;
      BEGIN
        SELECT INTO problem_row * FROM "Problems" WHERE id = NEW."problemId";
        SELECT INTO next_version COALESCE(MAX(version), 0) + 1 FROM "ProblemVersions" WHERE "problemId" = NEW."problemId";

        NEW."problemId" := problem_row.id;
        NEW."canvasId" := problem_row."canvasId";
        NEW.title := problem_row.title;
        NEW.statement := problem_row.statement;
        NEW."canvasData" := problem_row."canvasData";
        NEW."editOptions" := problem_row."editOptions";
        NEW."previewOptions" := problem_row."previewOptions";
        NEW."checkerCode" := problem_row."checkerCode";
        NEW."checkerCanvas" := problem_row."checkerCanvas";
        NEW.version := next_version;

        RETURN NEW;
      END;
      $$;


ALTER FUNCTION public.copy_problem_to_version() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Activities" (
    id integer NOT NULL,
    "userId" integer,
    "problemId" integer,
    "conseqFailedAttempt" integer,
    "isSolved" boolean,
    "lastSolveTimestamp" timestamp with time zone,
    "lastSuccessfulSolveTimestamp" timestamp with time zone,
    "totalFailedAttempt" integer,
    "viewDuration" integer,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.743+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.743+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Activities" OWNER TO postgres;

--
-- Name: Activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Activities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Activities_id_seq" OWNER TO postgres;

--
-- Name: Activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Activities_id_seq" OWNED BY public."Activities".id;


--
-- Name: Canvases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Canvases" (
    id integer NOT NULL,
    name character varying(255),
    classname character varying(255),
    info text,
    logo text,
    "editOptions" json,
    "previewOptions" json,
    template text,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.627+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.627+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Canvases" OWNER TO postgres;

--
-- Name: Canvases_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Canvases_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Canvases_id_seq" OWNER TO postgres;

--
-- Name: Canvases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Canvases_id_seq" OWNED BY public."Canvases".id;


--
-- Name: Clarifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Clarifications" (
    id integer NOT NULL,
    "contestId" integer,
    title character varying(255),
    details text,
    "postTime" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.862+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.862+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Clarifications" OWNER TO postgres;

--
-- Name: Clarifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Clarifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Clarifications_id_seq" OWNER TO postgres;

--
-- Name: Clarifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Clarifications_id_seq" OWNED BY public."Clarifications".id;


--
-- Name: ContestProblems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContestProblems" (
    id integer NOT NULL,
    "contestId" integer,
    "problemId" integer NOT NULL,
    status character varying(255),
    rating integer,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.811+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.811+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."ContestProblems" OWNER TO postgres;

--
-- Name: ContestProblems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContestProblems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ContestProblems_id_seq" OWNER TO postgres;

--
-- Name: ContestProblems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContestProblems_id_seq" OWNED BY public."ContestProblems".id;


--
-- Name: ContestSetters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContestSetters" (
    id integer NOT NULL,
    "contestId" integer,
    "setterId" integer,
    role character varying(255),
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.797+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.797+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."ContestSetters" OWNER TO postgres;

--
-- Name: ContestSetters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContestSetters_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ContestSetters_id_seq" OWNER TO postgres;

--
-- Name: ContestSetters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContestSetters_id_seq" OWNED BY public."ContestSetters".id;


--
-- Name: ContestSubmissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContestSubmissions" (
    id integer NOT NULL,
    "participantId" integer,
    "submissionId" integer,
    points integer,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.847+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.847+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."ContestSubmissions" OWNER TO postgres;

--
-- Name: ContestSubmissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContestSubmissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ContestSubmissions_id_seq" OWNER TO postgres;

--
-- Name: ContestSubmissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContestSubmissions_id_seq" OWNED BY public."ContestSubmissions".id;


--
-- Name: Contests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Contests" (
    id integer NOT NULL,
    title character varying(255),
    description text,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    status character varying(255),
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.763+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.763+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Contests" OWNER TO postgres;

--
-- Name: Contests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Contests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Contests_id_seq" OWNER TO postgres;

--
-- Name: Contests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Contests_id_seq" OWNED BY public."Contests".id;


--
-- Name: Credentials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Credentials" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    email character varying(255) NOT NULL,
    hashpass character varying(255) NOT NULL,
    role integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.721+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.721+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Credentials" OWNER TO postgres;

--
-- Name: Credentials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Credentials_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Credentials_id_seq" OWNER TO postgres;

--
-- Name: Credentials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Credentials_id_seq" OWNED BY public."Credentials".id;


--
-- Name: DailyActivities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DailyActivities" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "activityDate" date DEFAULT '2024-02-04'::date NOT NULL,
    duration integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.916+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.916+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."DailyActivities" OWNER TO postgres;

--
-- Name: DailyActivities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DailyActivities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DailyActivities_id_seq" OWNER TO postgres;

--
-- Name: DailyActivities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DailyActivities_id_seq" OWNED BY public."DailyActivities".id;


--
-- Name: EmailVerifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EmailVerifications" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text,
    "isVerified" boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.88+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.88+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."EmailVerifications" OWNER TO postgres;

--
-- Name: EmailVerifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EmailVerifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."EmailVerifications_id_seq" OWNER TO postgres;

--
-- Name: EmailVerifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EmailVerifications_id_seq" OWNED BY public."EmailVerifications".id;


--
-- Name: Participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Participants" (
    id integer NOT NULL,
    "contestId" integer,
    "userId" integer,
    type integer,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.827+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.827+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Participants" OWNER TO postgres;

--
-- Name: Participants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Participants_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Participants_id_seq" OWNER TO postgres;

--
-- Name: Participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Participants_id_seq" OWNED BY public."Participants".id;


--
-- Name: ProblemVersions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProblemVersions" (
    id integer NOT NULL,
    "seriesId" integer,
    "problemId" integer NOT NULL,
    "canvasId" integer NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    title character varying(255),
    statement text,
    "serialNo" integer DEFAULT 0,
    "isLive" boolean DEFAULT true,
    "canvasData" json,
    "editOptions" json,
    "previewOptions" json,
    "checkerCode" text,
    "checkerCanvas" json,
    "approvalStatus" integer DEFAULT 2,
    feedback text,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.684+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.684+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."ProblemVersions" OWNER TO postgres;

--
-- Name: ProblemVersions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProblemVersions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ProblemVersions_id_seq" OWNER TO postgres;

--
-- Name: ProblemVersions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProblemVersions_id_seq" OWNED BY public."ProblemVersions".id;


--
-- Name: Problems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Problems" (
    id integer NOT NULL,
    "setterId" integer NOT NULL,
    "canvasId" integer,
    title character varying(255),
    statement text DEFAULT ''::text,
    "canvasData" json,
    "editOptions" json,
    "previewOptions" json,
    "checkerCode" text,
    "checkerCanvas" json,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.663+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.663+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Problems" OWNER TO postgres;

--
-- Name: Problems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Problems_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Problems_id_seq" OWNER TO postgres;

--
-- Name: Problems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Problems_id_seq" OWNED BY public."Problems".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Series; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Series" (
    id integer NOT NULL,
    "topicId" integer,
    name character varying(255),
    description text,
    logo text,
    "isLive" boolean DEFAULT false,
    "serialNo" integer DEFAULT 0,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.606+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.606+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Series" OWNER TO postgres;

--
-- Name: Series_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Series_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Series_id_seq" OWNER TO postgres;

--
-- Name: Series_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Series_id_seq" OWNED BY public."Series".id;


--
-- Name: Setters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Setters" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "isApproved" boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.645+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.645+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Setters" OWNER TO postgres;

--
-- Name: Setters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Setters_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Setters_id_seq" OWNER TO postgres;

--
-- Name: Setters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Setters_id_seq" OWNED BY public."Setters".id;


--
-- Name: Submissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Submissions" (
    id integer NOT NULL,
    "problemId" integer NOT NULL,
    "userId" integer,
    verdict character varying(255),
    "canvasData" json,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.78+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.78+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Submissions" OWNER TO postgres;

--
-- Name: Submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Submissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Submissions_id_seq" OWNER TO postgres;

--
-- Name: Submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Submissions_id_seq" OWNED BY public."Submissions".id;


--
-- Name: Topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Topics" (
    id integer NOT NULL,
    name character varying(255),
    description text,
    logo text,
    "isLive" boolean DEFAULT false,
    "serialNo" integer DEFAULT 0,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.548+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.548+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Topics" OWNER TO postgres;

--
-- Name: Topics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Topics_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Topics_id_seq" OWNER TO postgres;

--
-- Name: Topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Topics_id_seq" OWNED BY public."Topics".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    fullname character varying(255),
    username character varying(255) NOT NULL,
    image text DEFAULT 'https://preview.redd.it/tried-to-make-the-discord-clyde-logo-more-similar-to-the-v0-g2bha52fh9v91.png?auto=webp&s=f74e8a7068998d18b22fa3bbb3e62ee9975204d3'::text,
    "createdAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.576+06'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2024-02-04 23:23:42.576+06'::timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Activities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Activities" ALTER COLUMN id SET DEFAULT nextval('public."Activities_id_seq"'::regclass);


--
-- Name: Canvases id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Canvases" ALTER COLUMN id SET DEFAULT nextval('public."Canvases_id_seq"'::regclass);


--
-- Name: Clarifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clarifications" ALTER COLUMN id SET DEFAULT nextval('public."Clarifications_id_seq"'::regclass);


--
-- Name: ContestProblems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestProblems" ALTER COLUMN id SET DEFAULT nextval('public."ContestProblems_id_seq"'::regclass);


--
-- Name: ContestSetters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestSetters" ALTER COLUMN id SET DEFAULT nextval('public."ContestSetters_id_seq"'::regclass);


--
-- Name: ContestSubmissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestSubmissions" ALTER COLUMN id SET DEFAULT nextval('public."ContestSubmissions_id_seq"'::regclass);


--
-- Name: Contests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contests" ALTER COLUMN id SET DEFAULT nextval('public."Contests_id_seq"'::regclass);


--
-- Name: Credentials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Credentials" ALTER COLUMN id SET DEFAULT nextval('public."Credentials_id_seq"'::regclass);


--
-- Name: DailyActivities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DailyActivities" ALTER COLUMN id SET DEFAULT nextval('public."DailyActivities_id_seq"'::regclass);


--
-- Name: EmailVerifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EmailVerifications" ALTER COLUMN id SET DEFAULT nextval('public."EmailVerifications_id_seq"'::regclass);


--
-- Name: Participants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Participants" ALTER COLUMN id SET DEFAULT nextval('public."Participants_id_seq"'::regclass);


--
-- Name: ProblemVersions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProblemVersions" ALTER COLUMN id SET DEFAULT nextval('public."ProblemVersions_id_seq"'::regclass);


--
-- Name: Problems id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Problems" ALTER COLUMN id SET DEFAULT nextval('public."Problems_id_seq"'::regclass);


--
-- Name: Series id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Series" ALTER COLUMN id SET DEFAULT nextval('public."Series_id_seq"'::regclass);


--
-- Name: Setters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Setters" ALTER COLUMN id SET DEFAULT nextval('public."Setters_id_seq"'::regclass);


--
-- Name: Submissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Submissions" ALTER COLUMN id SET DEFAULT nextval('public."Submissions_id_seq"'::regclass);


--
-- Name: Topics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Topics" ALTER COLUMN id SET DEFAULT nextval('public."Topics_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Activities" (id, "userId", "problemId", "conseqFailedAttempt", "isSolved", "lastSolveTimestamp", "lastSuccessfulSolveTimestamp", "totalFailedAttempt", "viewDuration", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Canvases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Canvases" (id, name, classname, info, logo, "editOptions", "previewOptions", template, "createdAt", "updatedAt") FROM stdin;
1	Graph	GraphComponent	Click anywhere in the canvas to create nodes. Click on two nodes to create an edge between them. You can also drag nodes.	https://cdn0.iconfinder.com/data/icons/graph-4/100/graph1-512.png	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":true,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":true,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":true,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	2024-02-04 23:23:45.278+06	2024-02-04 23:23:45.278+06
2	Tower of Hanoi	TowerOfHanoi	Drag and drop top most stacks from one peg to another.\nYou can increase the number of disks direcly from the top left spinner.\nOr you can add disks of different sizes from the bottom spinner. Choose your disk of your preffered size and drag and drop in the pegs.\nAt most 10 disks can be in each peg.\nYou cannot put larger disks over smaller ones.	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbAENY_duGomNEm95iTrLS6t6phHPiZ0pSAbgIwhXTOYCcIvfcj1z6QiSeM_PQblTkfoU&usqp=CAU	{"customDisk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"nDisks":{"value":false,"type":"switch"},"customDisk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	2024-02-04 23:23:45.278+06	2024-02-04 23:23:45.278+06
\.


--
-- Data for Name: Clarifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Clarifications" (id, "contestId", title, details, "postTime", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ContestProblems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ContestProblems" (id, "contestId", "problemId", status, rating, "createdAt", "updatedAt") FROM stdin;
1	1	1	published	200	2024-02-04 23:23:42.811+06	2024-02-04 23:23:42.811+06
\.


--
-- Data for Name: ContestSetters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ContestSetters" (id, "contestId", "setterId", role, "createdAt", "updatedAt") FROM stdin;
1	1	1	owner	2024-02-04 23:23:42.797+06	2024-02-04 23:23:42.797+06
\.


--
-- Data for Name: ContestSubmissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ContestSubmissions" (id, "participantId", "submissionId", points, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Contests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Contests" (id, title, description, "startDate", "endDate", status, "createdAt", "updatedAt") FROM stdin;
1	Demo Contest	Demo contest description	2025-01-01 06:00:00+06	2025-01-02 06:00:00+06	upcoming	2024-02-04 23:23:45.312+06	2024-02-04 23:23:45.312+06
\.


--
-- Data for Name: Credentials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Credentials" (id, "userId", email, hashpass, role, "createdAt", "updatedAt") FROM stdin;
1	1	mahirlabibdihan@gmail.com	$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK	1	2024-02-04 23:23:45.273+06	2024-02-04 23:23:45.273+06
2	2	mahirlabibdihan@gmail.com	$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK	0	2024-02-04 23:23:45.273+06	2024-02-04 23:23:45.273+06
3	3	sayemshahadsoummo@gmail.com	$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK	1	2024-02-04 23:23:45.273+06	2024-02-04 23:23:45.273+06
4	4	sayemshahadsoummo@gmail.com	$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK	0	2024-02-04 23:23:45.273+06	2024-02-04 23:23:45.273+06
5	5	souvik7701@gmail.com	$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK	1	2024-02-04 23:23:45.273+06	2024-02-04 23:23:45.273+06
6	6	souvik7701@gmail.com	$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK	0	2024-02-04 23:23:45.273+06	2024-02-04 23:23:45.273+06
7	7	mahirlabibdihan@gmail.com	$2a$10$yGG7Td2huTYO8YUlbRQKb.lJ6aNCYuhkMivF/yAxygtnF81MoHcTK	2	2024-02-04 23:23:45.273+06	2024-02-04 23:23:45.273+06
\.


--
-- Data for Name: DailyActivities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DailyActivities" (id, "userId", "activityDate", duration, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: EmailVerifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EmailVerifications" (id, "userId", token, "isVerified", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Participants" (id, "contestId", "userId", type, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ProblemVersions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProblemVersions" (id, "seriesId", "problemId", "canvasId", version, title, statement, "serialNo", "isLive", "canvasData", "editOptions", "previewOptions", "checkerCode", "checkerCanvas", "approvalStatus", feedback, "createdAt", "updatedAt") FROM stdin;
1	1	1	2	1	3 Disks	Move the 3 disks from left peg to right peg. You can use the middle peg to temporarily keep the disks.	4	t	{"pegs":[[0,1,2],[],[]]}	{"customDisk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":false,"type":"switch"},"nDisks":{"value":false,"type":"switch"},"customDisk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"pegs":[[],[],[0,1,2]]}	1	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
2	1	1	2	2	3 Disks	Move the 3 disks from left peg to right peg. You can use the middle peg to temporarily keep the disks.	4	t	{"pegs":[[0,1,2],[],[]]}	{"customDisk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":false,"type":"switch"},"nDisks":{"value":false,"type":"switch"},"customDisk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"pegs":[[],[],[0,1,2]]}	0	Problem statement is ambiguous.	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
3	1	1	2	3	3 Disks	Move the 3 disks from left peg to right peg. You can use the middle peg to temporarily keep the disks.	4	t	{"pegs":[[0,1,2],[],[]]}	{"customDisk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":false,"type":"switch"},"nDisks":{"value":false,"type":"switch"},"customDisk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"pegs":[[],[],[0,1,2]]}	2	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
4	1	2	2	1	Min 3 Disks	You already how to move 3 disks from one peg to another. But can you do it in minimum possible moves?	3	t	{"pegs":[[0,1,2],[],[]]}	{"customDisk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"nDisks":{"value":false,"type":"switch"},"customDisk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas) && userActivity.numberOfMoves == 7;\n}\n	{"pegs":[[],[],[0,1,2]]}	1	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
5	1	3	2	1	Min 4 Disks	Move the 4 disks from left to right peg in minimum possible moves.	2	t	{"pegs":[[0,1,2,3],[],[]]}	{"customDisk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"nDisks":{"value":false,"type":"switch"},"customDisk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas) && userActivity.numberOfMoves == 15;\n}\n	{"pegs":[[],[],[0,1,2,3]]}	1	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
6	1	4	2	1	Double TOH	Move the disks from left peg to right peg.	1	t	{"pegs":[[0,10,2,12,4,14,6,16,8,18],[],[]]}	{"customDisk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"nDisks":{"value":false,"type":"switch"},"customDisk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas) && userActivity.numberOfMoves == 62;\n}\n	{"pegs":[[],[],[10,0,2,12,4,14,6,16,8,18]]}	1	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
7	2	5	1	1	Road Construction	There are 5 cities numbered from 0 to 4. We can construct roads between cities. Each road has a number associated with it denoting the cost to construct a road. We want to minimize our cost. **Select the roads from the given canvas in a way that from every city we can go to every other city and cost of constructing the roads are minimum.**	2	t	{"edges":[{"start":"0","end":"1","weight":"10"},{"start":"3","end":"1","weight":"5"},{"start":"1","end":"2","weight":"30"},{"start":"0","end":"4","weight":"2"},{"start":"4","end":"3","weight":"3"},{"start":"4","end":"2","weight":"50"}],"nodes":{"0":{"x":159,"y":218.8000030517578,"label":0,"color":"Default"},"1":{"x":386,"y":87.80000305175781,"label":1,"color":"Default"},"2":{"x":628,"y":217.8000030517578,"label":2,"color":"Default"},"3":{"x":387,"y":234.8000030517578,"label":3,"color":"Default"},"4":{"x":392,"y":396.8000030517578,"label":4,"color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":true,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n * @param {Object} data (userCanvas/solutionCanvas) - An object containing nodes and edges properties.\n * @param {Array} data.nodes - HashMap of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end, weight properties.\n * @param {Array} data.selectedEdges - Array of selectedEdges. Where each edge is an object with start, end, weight properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas, solutionCanvas) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"edges":[{"start":"0","end":"1","weight":"10"},{"start":"3","end":"1","weight":"5"},{"start":"1","end":"2","weight":"30"},{"start":"0","end":"4","weight":"2"},{"start":"4","end":"3","weight":"3"},{"start":"4","end":"2","weight":"50"}],"nodes":{"0":{"x":159,"y":218.8000030517578,"label":0,"color":"Default"},"1":{"x":386,"y":87.80000305175781,"label":1,"color":"Default"},"2":{"x":628,"y":217.8000030517578,"label":2,"color":"Default"},"3":{"x":387,"y":234.8000030517578,"label":3,"color":"Default"},"4":{"x":392,"y":396.8000030517578,"label":4,"color":"Default"}},"selectedEdges":[{"start":"0","end":"4","weight":"2"},{"start":"1","end":"2","weight":"30"},{"start":"3","end":"1","weight":"5"},{"start":"4","end":"3","weight":"3"}]}	1	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
8	2	6	1	1	Road Construction 2	Similar to version 1.	1	t	{"edges":[{"start":"0","end":"1","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"5","end":"3","weight":"5"},{"start":"5","end":"2","weight":"5"},{"start":"0","end":"5","weight":"5"},{"start":"1","end":"5","weight":"5"},{"start":"5","end":"4","weight":"5"},{"start":"5","end":"6","weight":"5"}],"nodes":{"0":{"x":142,"y":196,"label":0,"color":"Default"},"1":{"x":274,"y":45,"label":1,"color":"Default"},"2":{"x":284,"y":357,"label":2,"color":"Default"},"3":{"x":492,"y":358,"label":3,"color":"Default"},"4":{"x":498,"y":41,"label":4,"color":"Default"},"5":{"x":391,"y":197,"label":5,"color":"Default"},"6":{"x":652,"y":205,"label":6,"color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":true,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction createGraph(edges) {\n  const graph = new Map();\n  for (const edge of edges) {\n    const { start, end, weight } = edge;\n\n    if (!graph.has(start)) {\n      graph.set(start, []);\n    }\n\n    if (!graph.has(end)) {\n      graph.set(end, []);\n    }\n\n    graph.get(start).push({ value: end, weight: parseInt(weight) });\n    graph.get(end).push({ value: start, weight: parseInt(weight) });\n  }\n  return graph;\n}\nfunction getCost(graph) {\n  // Step 3: Implement DFS to check if the graph is disconnected\n  function isDisconnected() {\n    const visited = new Set();\n    const nodes = [...graph.keys()];\n\n    function dfs(node) {\n      visited.add(node);\n      for (const neighbor of graph.get(node)) {\n        if (!visited.has(neighbor.value)) {\n          dfs(neighbor.value);\n        }\n      }\n    }\n    dfs(nodes[0]); // Start DFS from the first node\n    return visited.size !== nodes.length;\n  }\n\n  const disconnected = isDisconnected();\n\n  // Step 4: Calculate the sum of edge weights\n  function sumEdgeWeights() {\n    let sum = 0;\n    for (const edges of graph.values()) {\n      for (const edge of edges) {\n        sum += edge.weight;\n      }\n    }\n    return sum / 2;\n  }\n\n  if (disconnected) return -1;\n\n  const edgeWeightSum = sumEdgeWeights();\n  return edgeWeightSum;\n}\nfunction solutionChecker(userCanvas, solutionCanvas) {\n  const user_graph = createGraph(userCanvas.selectedEdges);\n  const setter_graph = createGraph(solutionCanvas.selectedEdges);\n\n  if (Array.from(user_graph.keys()).length !== Array.from(setter_graph.keys()).length)\n    return false;\n  const user_cost = getCost(user_graph);\n  const setter_cost = getCost(setter_graph);\n  console.log(user_cost);\n  if (user_cost !== -1 && user_cost === setter_cost) {\n    return true;\n  } else {\n    return false;\n  }\n}\n	{"edges":[{"start":"0","end":"1","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"5","end":"3","weight":"5"},{"start":"5","end":"2","weight":"5"},{"start":"0","end":"5","weight":"5"},{"start":"1","end":"5","weight":"5"},{"start":"5","end":"4","weight":"5"},{"start":"5","end":"6","weight":"5"}],"nodes":{"0":{"x":142,"y":196,"label":0,"color":"Default"},"1":{"x":274,"y":45,"label":1,"color":"Default"},"2":{"x":284,"y":357,"label":2,"color":"Default"},"3":{"x":492,"y":358,"label":3,"color":"Default"},"4":{"x":498,"y":41,"label":4,"color":"Default"},"5":{"x":391,"y":197,"label":5,"color":"Default"},"6":{"x":652,"y":205,"label":6,"color":"Default"}},"selectedEdges":[{"start":"0","end":"1","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"5","end":"2","weight":"5"}]}	1	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
9	4	7	1	1	Coloring	Draw the graph with only 3 colors. **No nodes should be left to default color.**	1	t	{"edges":[{"start":"8","end":"6","weight":"0"},{"start":"6","end":"9","weight":"0"},{"start":"9","end":"5","weight":"0"},{"start":"5","end":"7","weight":"0"},{"start":"7","end":"8","weight":"0"},{"start":"8","end":"3","weight":"0"},{"start":"9","end":"4","weight":"0"},{"start":"7","end":"2","weight":"0"},{"start":"1","end":"6","weight":"0"},{"start":"0","end":"5","weight":"0"},{"start":"0","end":"3","weight":"0"},{"start":"4","end":"2","weight":"0"},{"start":"4","end":"3","weight":"0"},{"start":"0","end":"1","weight":"0"},{"start":"1","end":"2","weight":"0"}],"nodes":{"0":{"x":198.79998779296875,"y":232,"label":"","color":"Default"},"1":{"x":444.79998779296875,"y":39,"label":"","color":"Default"},"2":{"x":683.7999877929688,"y":233,"label":"","color":"Default"},"3":{"x":310.79998779296875,"y":431,"label":"","color":"Default"},"4":{"x":590.7999877929688,"y":428,"label":"","color":"Default"},"5":{"x":311.79998779296875,"y":235,"label":"","color":"Default"},"6":{"x":446.79998779296875,"y":142,"label":"","color":"Default"},"7":{"x":579.7999877929688,"y":235,"label":"","color":"Default"},"8":{"x":362.79998779296875,"y":344,"label":"","color":"Default"},"9":{"x":539.7999877929688,"y":345,"label":"","color":"Default"}},"selectedEdges":[],"createdAt":"2024-02-04T17:23:45.285Z","updatedAt":"2024-02-04T17:23:45.285Z"}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":false,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":true,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":true,"type":"switch"}}	/**\r\n *\r\n * @param {Object} data - An object containing nodes and edges properties.\r\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\r\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\r\n * @returns {boolean} True if the solution is valid, otherwise false.\r\n */\r\nfunction solutionChecker(data) {\r\n  // const edges =  data.edges.map(edge => ({\r\n\t// \tstart: edge.start,\r\n\t// \tend: edge.end,\r\n\t// \tweight: edge.weight\r\n  // }));\r\n  \r\n\r\n  const allEdgesHaveDifferentColors = data.edges.every(\r\n    edge => data.nodes[edge.start].color !== data.nodes[edge.end].color && data.nodes[edge.end].color !== "Default"); \r\n\r\n  const uniqueColorsSet = new Set();\r\n  data.edges.forEach(edge => {\r\n    uniqueColorsSet.add(data.nodes[edge.start].color);\r\n    uniqueColorsSet.add(data.nodes[edge.end].color);\r\n  });\r\n\r\n  const numberOfUniqueColors = uniqueColorsSet.size;\r\n\r\n  return allEdgesHaveDifferentColors && numberOfUniqueColors == 3;\r\n}	\N	1	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
10	\N	8	1	1	Bipartition	Remove minimum possible edges, such that the graph is a bipartite graph.	\N	\N	\N	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":false,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":true,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start,\n\t\tend: edge.end,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}	\N	2	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
11	7	9	1	1	Rearrange	Drag the nodes to make the graph a plane graph. In a plane graph there is no crossing edges.	1	t	{"edges":[{"start":"0","end":"1","weight":"0"},{"start":"1","end":"3","weight":"0"},{"start":"3","end":"2","weight":"0"},{"start":"2","end":"0","weight":"0"},{"start":"4","end":"5","weight":"0"},{"start":"5","end":"7","weight":"0"},{"start":"7","end":"6","weight":"0"},{"start":"6","end":"4","weight":"0"},{"start":"1","end":"5","weight":"0"},{"start":"4","end":"0","weight":"0"},{"start":"2","end":"6","weight":"0"},{"start":"3","end":"7","weight":"0"}],"nodes":{"0":{"x":281,"y":30,"label":0,"color":"Default"},"1":{"x":610,"y":32,"label":1,"color":"Default"},"2":{"x":278,"y":276,"label":2,"color":"Default"},"3":{"x":615,"y":278,"label":3,"color":"Default"},"4":{"x":444,"y":156,"label":4,"color":"Default"},"5":{"x":796,"y":156,"label":5,"color":"Default"},"6":{"x":448,"y":447,"label":6,"color":"Default"},"7":{"x":812,"y":449,"label":7,"color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":false,"type":"switch"}}	{"addNode":{"value":true,"type":"switch"},"deleteNode":{"value":true,"type":"switch"},"dragNode":{"value":true,"type":"switch"},"addEdge":{"value":true,"type":"switch"},"deleteEdge":{"value":true,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction isIntersecting(a, b, c, d) {\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\n    function ccw(a, b, c) {\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\n    }\n\n    return (\n        ccw(a, c, d) !== ccw(b, c, d) &&\n        ccw(a, b, c) !== ccw(a, b, d)\n    );\n}\n\n\nfunction hasCommonNode(edgeA, edgeB) {\n    return (\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.end) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.end)\n    );\n}\n\nfunction solutionChecker(data) {\n    const nodes = data.nodes;\n    const edges = data.edges;\n\n    for (let i = 0; i < edges.length; i++) {\n        const edgeA = edges[i];\n        \n        const startA = nodes[edgeA.start];\n        const endA = nodes[edgeA.end];\n\n        for (let j = i + 1; j < edges.length; j++) {\n            const edgeB = edges[j];\n\n            const startB = nodes[edgeB.start];\n            const endB = nodes[edgeB.end];\n\n            if (\n                isIntersecting(startA, endA, startB, endB) &&\n                !hasCommonNode(edgeA, edgeB)\n            ) {\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\n                return false;\n            }\n        }\n    }\n\n    // No intersections found, it's a plane graph\n    return true;\n}	\N	1	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
12	3	10	1	1	Shorter Path	Select the edges that forms the shortest path from 0 to 6.	1	t	{"edges":[{"start":"0","end":"1","weight":"4"},{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"},{"start":"3","end":"1","weight":"3"},{"start":"1","end":"4","weight":"4"},{"start":"6","end":"5","weight":"8"},{"start":"2","end":"5","weight":"6"}],"nodes":{"0":{"x":125.60000610351562,"y":202.26666259765625,"label":0,"color":"Default"},"1":{"x":298.6000061035156,"y":71.26666259765625,"label":1,"color":"Default"},"2":{"x":271.6000061035156,"y":376.26666259765625,"label":2,"color":"Default"},"3":{"x":435.6000061035156,"y":236.26666259765625,"label":3,"color":"Default"},"4":{"x":561.6000061035156,"y":64.26666259765625,"label":4,"color":"Default"},"5":{"x":600.6000061035156,"y":377.26666259765625,"label":5,"color":"Default"},"6":{"x":747.6000061035156,"y":198.26666259765625,"label":6,"color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":true,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":true,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas, solutionCanvas) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"edges":[{"start":"0","end":"1","weight":"4"},{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"},{"start":"3","end":"1","weight":"3"},{"start":"1","end":"4","weight":"4"},{"start":"6","end":"5","weight":"8"},{"start":"2","end":"5","weight":"6"}],"nodes":{"0":{"x":125.60000610351562,"y":202.26666259765625,"label":0,"color":"Default"},"1":{"x":298.6000061035156,"y":71.26666259765625,"label":1,"color":"Default"},"2":{"x":271.6000061035156,"y":376.26666259765625,"label":2,"color":"Default"},"3":{"x":435.6000061035156,"y":236.26666259765625,"label":3,"color":"Default"},"4":{"x":561.6000061035156,"y":64.26666259765625,"label":4,"color":"Default"},"5":{"x":600.6000061035156,"y":377.26666259765625,"label":5,"color":"Default"},"6":{"x":747.6000061035156,"y":198.26666259765625,"label":6,"color":"Default"}},"selectedEdges":[{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"}]}	1	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
13	6	11	1	1	Round n Round	Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?	1	t	{"edges":[{"start":"0","end":"1","weight":"12"},{"start":"1","end":"2","weight":"8"},{"start":"0","end":"2","weight":"10"},{"start":"1","end":"3","weight":"12"},{"start":"2","end":"3","weight":"11"},{"start":"2","end":"4","weight":"3"},{"start":"4","end":"3","weight":"11"},{"start":"4","end":"5","weight":"6"},{"start":"5","end":"3","weight":"10"},{"start":"6","end":"5","weight":"9"},{"start":"6","end":"4","weight":"7"},{"start":"6","end":"2","weight":"9"},{"start":"0","end":"6","weight":"12"}],"nodes":{"0":{"x":82.16668701171875,"y":268.06666564941406,"label":0,"color":"Default"},"1":{"x":397.16668701171875,"y":55.06666564941406,"label":1,"color":"Default"},"2":{"x":345.16668701171875,"y":227.06666564941406,"label":2,"color":"Default"},"3":{"x":664.1666870117188,"y":89.06666564941406,"label":3,"color":"Default"},"4":{"x":453.16668701171875,"y":300.06666564941406,"label":4,"color":"Default"},"5":{"x":656.1666870117188,"y":344.06666564941406,"label":5,"color":"Default"},"6":{"x":328.16668701171875,"y":441.06666564941406,"label":6,"color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":true,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"edges":[{"start":"0","end":"1","weight":"12"},{"start":"1","end":"2","weight":"8"},{"start":"0","end":"2","weight":"10"},{"start":"1","end":"3","weight":"12"},{"start":"2","end":"3","weight":"11"},{"start":"2","end":"4","weight":"3"},{"start":"4","end":"3","weight":"11"},{"start":"4","end":"5","weight":"6"},{"start":"5","end":"3","weight":"10"},{"start":"6","end":"5","weight":"9"},{"start":"6","end":"4","weight":"7"},{"start":"6","end":"2","weight":"9"},{"start":"0","end":"6","weight":"12"}],"nodes":{"0":{"x":82.16668701171875,"y":268.06666564941406,"label":0,"color":"Default"},"1":{"x":397.16668701171875,"y":55.06666564941406,"label":1,"color":"Default"},"2":{"x":345.16668701171875,"y":227.06666564941406,"label":2,"color":"Default"},"3":{"x":664.1666870117188,"y":89.06666564941406,"label":3,"color":"Default"},"4":{"x":453.16668701171875,"y":300.06666564941406,"label":4,"color":"Default"},"5":{"x":656.1666870117188,"y":344.06666564941406,"label":5,"color":"Default"},"6":{"x":328.16668701171875,"y":441.06666564941406,"label":6,"color":"Default"}},"selectedEdges":[{"start":"0","end":"1","weight":"12"},{"start":"0","end":"2","weight":"10"},{"start":"1","end":"3","weight":"12"},{"start":"2","end":"4","weight":"3"},{"start":"5","end":"3","weight":"10"},{"start":"6","end":"4","weight":"7"},{"start":"6","end":"5","weight":"9"}]}	1	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
14	\N	12	1	1	Pentagon and Pentagram	Convert the Pentagram to a Pentagon.	\N	\N	{"edges":[{"start":"3","end":"0","weight":"0"},{"start":"0","end":"4","weight":"0"},{"start":"2","end":"4","weight":"0"},{"start":"1","end":"2","weight":"0"},{"start":"3","end":"1","weight":"0"}],"nodes":{"0":{"x":430.79998779296875,"y":40.19999694824219,"label":"","color":"Default"},"1":{"x":599.7999877929688,"y":145.1999969482422,"label":"","color":"Default"},"2":{"x":274.79998779296875,"y":146.1999969482422,"label":"","color":"Default"},"3":{"x":324.79998779296875,"y":330.1999969482422,"label":"","color":"Default"},"4":{"x":545.7999877929688,"y":332.1999969482422,"label":"","color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":false,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":true,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\r\n *\r\n * @param {Object} data - An object containing nodes and edges properties.\r\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\r\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\r\n * @returns {boolean} True if the solution is valid, otherwise false.\r\n */\r\n\r\nfunction isIntersecting(a, b, c, d) {\r\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\r\n    function ccw(a, b, c) {\r\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\r\n    }\r\n\r\n    return (\r\n        ccw(a, c, d) !== ccw(b, c, d) &&\r\n        ccw(a, b, c) !== ccw(a, b, d)\r\n    );\r\n}\r\n\r\n\r\nfunction hasCommonNode(edgeA, edgeB) {\r\n    return (\r\n        edgeA.start === edgeB.start ||\r\n        edgeA.start === edgeB.end ||\r\n        edgeA.end === edgeB.start ||\r\n        edgeA.end === edgeB.end\r\n    );\r\n}\r\n\r\nfunction solutionChecker(data) {\r\n    const nodes = data.nodes;\r\n    const edges = data.edges;\r\n\r\n    for (let i = 0; i < edges.length; i++) {\r\n        const edgeA = edges[i];\r\n        \r\n        const startA = nodes[edgeA.start];\r\n        const endA = nodes[edgeA.end];\r\n\r\n        for (let j = i + 1; j < edges.length; j++) {\r\n            const edgeB = edges[j];\r\n\r\n            const startB = nodes[edgeB.start];\r\n            const endB = nodes[edgeB.end];\r\n\r\n            if (\r\n                isIntersecting(startA, endA, startB, endB) &&\r\n                !hasCommonNode(edgeA, edgeB)\r\n            ) {\r\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\r\n                return false;\r\n            }\r\n        }\r\n    }\r\n\r\n    // No intersections found, it's a plane graph\r\n    return true;\r\n}	\N	2	\N	2024-02-04 23:23:42.684+06	2024-02-04 23:23:42.684+06
\.


--
-- Data for Name: Problems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Problems" (id, "setterId", "canvasId", title, statement, "canvasData", "editOptions", "previewOptions", "checkerCode", "checkerCanvas", "createdAt", "updatedAt") FROM stdin;
1	1	2	3 Disks	Move the 3 disks from left peg to right peg. You can use the middle peg to temporarily keep the disks.	{"pegs":[[0,1,2],[],[]]}	{"customDisk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":false,"type":"switch"},"nDisks":{"value":false,"type":"switch"},"customDisk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"pegs":[[],[],[0,1,2]]}	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
2	1	2	Min 3 Disks	You already how to move 3 disks from one peg to another. But can you do it in minimum possible moves?	{"pegs":[[0,1,2],[],[]]}	{"customDisk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"nDisks":{"value":false,"type":"switch"},"customDisk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas) && userActivity.numberOfMoves == 7;\n}\n	{"pegs":[[],[],[0,1,2]]}	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
3	1	2	Min 4 Disks	Move the 4 disks from left to right peg in minimum possible moves.	{"pegs":[[0,1,2,3],[],[]]}	{"customDisk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"nDisks":{"value":false,"type":"switch"},"customDisk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing pegs and disks.\n * @param {Array} data.pegs - Array of list of disks.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas) && userActivity.numberOfMoves == 15;\n}\n	{"pegs":[[],[],[0,1,2,3]]}	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
4	1	2	Double TOH	Move the disks from left peg to right peg.	{"pegs":[[0,10,2,12,4,14,6,16,8,18],[],[]]}	{"customDisk":{"value":true,"type":"switch"},"ordered":{"value":true,"type":"switch"}}	{"moves":{"value":true,"type":"switch"},"nDisks":{"value":false,"type":"switch"},"customDisk":{"value":false,"type":"switch"},"undo":{"value":true,"type":"switch"}}	\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas) && userActivity.numberOfMoves == 62;\n}\n	{"pegs":[[],[],[10,0,2,12,4,14,6,16,8,18]]}	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
5	1	1	Road Construction	There are 5 cities numbered from 0 to 4. We can construct roads between cities. Each road has a number associated with it denoting the cost to construct a road. We want to minimize our cost. **Select the roads from the given canvas in a way that from every city we can go to every other city and cost of constructing the roads are minimum.**	{"edges":[{"start":"0","end":"1","weight":"10"},{"start":"3","end":"1","weight":"5"},{"start":"1","end":"2","weight":"30"},{"start":"0","end":"4","weight":"2"},{"start":"4","end":"3","weight":"3"},{"start":"4","end":"2","weight":"50"}],"nodes":{"0":{"x":159,"y":218.8000030517578,"label":0,"color":"Default"},"1":{"x":386,"y":87.80000305175781,"label":1,"color":"Default"},"2":{"x":628,"y":217.8000030517578,"label":2,"color":"Default"},"3":{"x":387,"y":234.8000030517578,"label":3,"color":"Default"},"4":{"x":392,"y":396.8000030517578,"label":4,"color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":true,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n * @param {Object} data (userCanvas/solutionCanvas) - An object containing nodes and edges properties.\n * @param {Array} data.nodes - HashMap of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end, weight properties.\n * @param {Array} data.selectedEdges - Array of selectedEdges. Where each edge is an object with start, end, weight properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas, solutionCanvas) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"edges":[{"start":"0","end":"1","weight":"10"},{"start":"3","end":"1","weight":"5"},{"start":"1","end":"2","weight":"30"},{"start":"0","end":"4","weight":"2"},{"start":"4","end":"3","weight":"3"},{"start":"4","end":"2","weight":"50"}],"nodes":{"0":{"x":159,"y":218.8000030517578,"label":0,"color":"Default"},"1":{"x":386,"y":87.80000305175781,"label":1,"color":"Default"},"2":{"x":628,"y":217.8000030517578,"label":2,"color":"Default"},"3":{"x":387,"y":234.8000030517578,"label":3,"color":"Default"},"4":{"x":392,"y":396.8000030517578,"label":4,"color":"Default"}},"selectedEdges":[{"start":"0","end":"4","weight":"2"},{"start":"1","end":"2","weight":"30"},{"start":"3","end":"1","weight":"5"},{"start":"4","end":"3","weight":"3"}]}	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
6	1	1	Road Construction 2	Similar to version 1.	{"edges":[{"start":"0","end":"1","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"5","end":"3","weight":"5"},{"start":"5","end":"2","weight":"5"},{"start":"0","end":"5","weight":"5"},{"start":"1","end":"5","weight":"5"},{"start":"5","end":"4","weight":"5"},{"start":"5","end":"6","weight":"5"}],"nodes":{"0":{"x":142,"y":196,"label":0,"color":"Default"},"1":{"x":274,"y":45,"label":1,"color":"Default"},"2":{"x":284,"y":357,"label":2,"color":"Default"},"3":{"x":492,"y":358,"label":3,"color":"Default"},"4":{"x":498,"y":41,"label":4,"color":"Default"},"5":{"x":391,"y":197,"label":5,"color":"Default"},"6":{"x":652,"y":205,"label":6,"color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":true,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction createGraph(edges) {\n  const graph = new Map();\n  for (const edge of edges) {\n    const { start, end, weight } = edge;\n\n    if (!graph.has(start)) {\n      graph.set(start, []);\n    }\n\n    if (!graph.has(end)) {\n      graph.set(end, []);\n    }\n\n    graph.get(start).push({ value: end, weight: parseInt(weight) });\n    graph.get(end).push({ value: start, weight: parseInt(weight) });\n  }\n  return graph;\n}\nfunction getCost(graph) {\n  // Step 3: Implement DFS to check if the graph is disconnected\n  function isDisconnected() {\n    const visited = new Set();\n    const nodes = [...graph.keys()];\n\n    function dfs(node) {\n      visited.add(node);\n      for (const neighbor of graph.get(node)) {\n        if (!visited.has(neighbor.value)) {\n          dfs(neighbor.value);\n        }\n      }\n    }\n    dfs(nodes[0]); // Start DFS from the first node\n    return visited.size !== nodes.length;\n  }\n\n  const disconnected = isDisconnected();\n\n  // Step 4: Calculate the sum of edge weights\n  function sumEdgeWeights() {\n    let sum = 0;\n    for (const edges of graph.values()) {\n      for (const edge of edges) {\n        sum += edge.weight;\n      }\n    }\n    return sum / 2;\n  }\n\n  if (disconnected) return -1;\n\n  const edgeWeightSum = sumEdgeWeights();\n  return edgeWeightSum;\n}\nfunction solutionChecker(userCanvas, solutionCanvas) {\n  const user_graph = createGraph(userCanvas.selectedEdges);\n  const setter_graph = createGraph(solutionCanvas.selectedEdges);\n\n  if (Array.from(user_graph.keys()).length !== Array.from(setter_graph.keys()).length)\n    return false;\n  const user_cost = getCost(user_graph);\n  const setter_cost = getCost(setter_graph);\n  console.log(user_cost);\n  if (user_cost !== -1 && user_cost === setter_cost) {\n    return true;\n  } else {\n    return false;\n  }\n}\n	{"edges":[{"start":"0","end":"1","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"5","end":"3","weight":"5"},{"start":"5","end":"2","weight":"5"},{"start":"0","end":"5","weight":"5"},{"start":"1","end":"5","weight":"5"},{"start":"5","end":"4","weight":"5"},{"start":"5","end":"6","weight":"5"}],"nodes":{"0":{"x":142,"y":196,"label":0,"color":"Default"},"1":{"x":274,"y":45,"label":1,"color":"Default"},"2":{"x":284,"y":357,"label":2,"color":"Default"},"3":{"x":492,"y":358,"label":3,"color":"Default"},"4":{"x":498,"y":41,"label":4,"color":"Default"},"5":{"x":391,"y":197,"label":5,"color":"Default"},"6":{"x":652,"y":205,"label":6,"color":"Default"}},"selectedEdges":[{"start":"0","end":"1","weight":"3"},{"start":"0","end":"2","weight":"3"},{"start":"1","end":"4","weight":"3"},{"start":"2","end":"3","weight":"3"},{"start":"3","end":"6","weight":"3"},{"start":"4","end":"6","weight":"3"},{"start":"5","end":"2","weight":"5"}]}	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
7	1	1	Coloring	Draw the graph with only 3 colors. **No nodes should be left to default color.**	{"edges":[{"start":"8","end":"6","weight":"0"},{"start":"6","end":"9","weight":"0"},{"start":"9","end":"5","weight":"0"},{"start":"5","end":"7","weight":"0"},{"start":"7","end":"8","weight":"0"},{"start":"8","end":"3","weight":"0"},{"start":"9","end":"4","weight":"0"},{"start":"7","end":"2","weight":"0"},{"start":"1","end":"6","weight":"0"},{"start":"0","end":"5","weight":"0"},{"start":"0","end":"3","weight":"0"},{"start":"4","end":"2","weight":"0"},{"start":"4","end":"3","weight":"0"},{"start":"0","end":"1","weight":"0"},{"start":"1","end":"2","weight":"0"}],"nodes":{"0":{"x":198.79998779296875,"y":232,"label":"","color":"Default"},"1":{"x":444.79998779296875,"y":39,"label":"","color":"Default"},"2":{"x":683.7999877929688,"y":233,"label":"","color":"Default"},"3":{"x":310.79998779296875,"y":431,"label":"","color":"Default"},"4":{"x":590.7999877929688,"y":428,"label":"","color":"Default"},"5":{"x":311.79998779296875,"y":235,"label":"","color":"Default"},"6":{"x":446.79998779296875,"y":142,"label":"","color":"Default"},"7":{"x":579.7999877929688,"y":235,"label":"","color":"Default"},"8":{"x":362.79998779296875,"y":344,"label":"","color":"Default"},"9":{"x":539.7999877929688,"y":345,"label":"","color":"Default"}},"selectedEdges":[],"createdAt":"2024-02-04T17:23:45.285Z","updatedAt":"2024-02-04T17:23:45.285Z"}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":false,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":true,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":true,"type":"switch"}}	/**\r\n *\r\n * @param {Object} data - An object containing nodes and edges properties.\r\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\r\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\r\n * @returns {boolean} True if the solution is valid, otherwise false.\r\n */\r\nfunction solutionChecker(data) {\r\n  // const edges =  data.edges.map(edge => ({\r\n\t// \tstart: edge.start,\r\n\t// \tend: edge.end,\r\n\t// \tweight: edge.weight\r\n  // }));\r\n  \r\n\r\n  const allEdgesHaveDifferentColors = data.edges.every(\r\n    edge => data.nodes[edge.start].color !== data.nodes[edge.end].color && data.nodes[edge.end].color !== "Default"); \r\n\r\n  const uniqueColorsSet = new Set();\r\n  data.edges.forEach(edge => {\r\n    uniqueColorsSet.add(data.nodes[edge.start].color);\r\n    uniqueColorsSet.add(data.nodes[edge.end].color);\r\n  });\r\n\r\n  const numberOfUniqueColors = uniqueColorsSet.size;\r\n\r\n  return allEdgesHaveDifferentColors && numberOfUniqueColors == 3;\r\n}	\N	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
8	1	1	Bipartition	Remove minimum possible edges, such that the graph is a bipartite graph.	\N	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":false,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":true,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(data) {\n  const edges =  data.edges.map(edge => ({\n\t\tstart: edge.start,\n\t\tend: edge.end,\n\t\tweight: edge.weight\n\t}));\n\t\n  return false;\n}	\N	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
9	1	1	Rearrange	Drag the nodes to make the graph a plane graph. In a plane graph there is no crossing edges.	{"edges":[{"start":"0","end":"1","weight":"0"},{"start":"1","end":"3","weight":"0"},{"start":"3","end":"2","weight":"0"},{"start":"2","end":"0","weight":"0"},{"start":"4","end":"5","weight":"0"},{"start":"5","end":"7","weight":"0"},{"start":"7","end":"6","weight":"0"},{"start":"6","end":"4","weight":"0"},{"start":"1","end":"5","weight":"0"},{"start":"4","end":"0","weight":"0"},{"start":"2","end":"6","weight":"0"},{"start":"3","end":"7","weight":"0"}],"nodes":{"0":{"x":281,"y":30,"label":0,"color":"Default"},"1":{"x":610,"y":32,"label":1,"color":"Default"},"2":{"x":278,"y":276,"label":2,"color":"Default"},"3":{"x":615,"y":278,"label":3,"color":"Default"},"4":{"x":444,"y":156,"label":4,"color":"Default"},"5":{"x":796,"y":156,"label":5,"color":"Default"},"6":{"x":448,"y":447,"label":6,"color":"Default"},"7":{"x":812,"y":449,"label":7,"color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":false,"type":"switch"}}	{"addNode":{"value":true,"type":"switch"},"deleteNode":{"value":true,"type":"switch"},"dragNode":{"value":true,"type":"switch"},"addEdge":{"value":true,"type":"switch"},"deleteEdge":{"value":true,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\n\nfunction isIntersecting(a, b, c, d) {\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\n    function ccw(a, b, c) {\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\n    }\n\n    return (\n        ccw(a, c, d) !== ccw(b, c, d) &&\n        ccw(a, b, c) !== ccw(a, b, d)\n    );\n}\n\n\nfunction hasCommonNode(edgeA, edgeB) {\n    return (\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.start) === JSON.stringify(edgeB.end) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.start) ||\n        JSON.stringify(edgeA.end) === JSON.stringify(edgeB.end)\n    );\n}\n\nfunction solutionChecker(data) {\n    const nodes = data.nodes;\n    const edges = data.edges;\n\n    for (let i = 0; i < edges.length; i++) {\n        const edgeA = edges[i];\n        \n        const startA = nodes[edgeA.start];\n        const endA = nodes[edgeA.end];\n\n        for (let j = i + 1; j < edges.length; j++) {\n            const edgeB = edges[j];\n\n            const startB = nodes[edgeB.start];\n            const endB = nodes[edgeB.end];\n\n            if (\n                isIntersecting(startA, endA, startB, endB) &&\n                !hasCommonNode(edgeA, edgeB)\n            ) {\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\n                return false;\n            }\n        }\n    }\n\n    // No intersections found, it's a plane graph\n    return true;\n}	\N	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
10	1	1	Shorter Path	Select the edges that forms the shortest path from 0 to 6.	{"edges":[{"start":"0","end":"1","weight":"4"},{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"},{"start":"3","end":"1","weight":"3"},{"start":"1","end":"4","weight":"4"},{"start":"6","end":"5","weight":"8"},{"start":"2","end":"5","weight":"6"}],"nodes":{"0":{"x":125.60000610351562,"y":202.26666259765625,"label":0,"color":"Default"},"1":{"x":298.6000061035156,"y":71.26666259765625,"label":1,"color":"Default"},"2":{"x":271.6000061035156,"y":376.26666259765625,"label":2,"color":"Default"},"3":{"x":435.6000061035156,"y":236.26666259765625,"label":3,"color":"Default"},"4":{"x":561.6000061035156,"y":64.26666259765625,"label":4,"color":"Default"},"5":{"x":600.6000061035156,"y":377.26666259765625,"label":5,"color":"Default"},"6":{"x":747.6000061035156,"y":198.26666259765625,"label":6,"color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":true,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":true,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas, solutionCanvas) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"edges":[{"start":"0","end":"1","weight":"4"},{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"},{"start":"3","end":"1","weight":"3"},{"start":"1","end":"4","weight":"4"},{"start":"6","end":"5","weight":"8"},{"start":"2","end":"5","weight":"6"}],"nodes":{"0":{"x":125.60000610351562,"y":202.26666259765625,"label":0,"color":"Default"},"1":{"x":298.6000061035156,"y":71.26666259765625,"label":1,"color":"Default"},"2":{"x":271.6000061035156,"y":376.26666259765625,"label":2,"color":"Default"},"3":{"x":435.6000061035156,"y":236.26666259765625,"label":3,"color":"Default"},"4":{"x":561.6000061035156,"y":64.26666259765625,"label":4,"color":"Default"},"5":{"x":600.6000061035156,"y":377.26666259765625,"label":5,"color":"Default"},"6":{"x":747.6000061035156,"y":198.26666259765625,"label":6,"color":"Default"}},"selectedEdges":[{"start":"0","end":"2","weight":"1"},{"start":"2","end":"3","weight":"2"},{"start":"3","end":"4","weight":"4"},{"start":"4","end":"6","weight":"2"}]}	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
11	1	1	Round n Round	Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?	{"edges":[{"start":"0","end":"1","weight":"12"},{"start":"1","end":"2","weight":"8"},{"start":"0","end":"2","weight":"10"},{"start":"1","end":"3","weight":"12"},{"start":"2","end":"3","weight":"11"},{"start":"2","end":"4","weight":"3"},{"start":"4","end":"3","weight":"11"},{"start":"4","end":"5","weight":"6"},{"start":"5","end":"3","weight":"10"},{"start":"6","end":"5","weight":"9"},{"start":"6","end":"4","weight":"7"},{"start":"6","end":"2","weight":"9"},{"start":"0","end":"6","weight":"12"}],"nodes":{"0":{"x":82.16668701171875,"y":268.06666564941406,"label":0,"color":"Default"},"1":{"x":397.16668701171875,"y":55.06666564941406,"label":1,"color":"Default"},"2":{"x":345.16668701171875,"y":227.06666564941406,"label":2,"color":"Default"},"3":{"x":664.1666870117188,"y":89.06666564941406,"label":3,"color":"Default"},"4":{"x":453.16668701171875,"y":300.06666564941406,"label":4,"color":"Default"},"5":{"x":656.1666870117188,"y":344.06666564941406,"label":5,"color":"Default"},"6":{"x":328.16668701171875,"y":441.06666564941406,"label":6,"color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":true,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"edges":[{"start":"0","end":"1","weight":"12"},{"start":"1","end":"2","weight":"8"},{"start":"0","end":"2","weight":"10"},{"start":"1","end":"3","weight":"12"},{"start":"2","end":"3","weight":"11"},{"start":"2","end":"4","weight":"3"},{"start":"4","end":"3","weight":"11"},{"start":"4","end":"5","weight":"6"},{"start":"5","end":"3","weight":"10"},{"start":"6","end":"5","weight":"9"},{"start":"6","end":"4","weight":"7"},{"start":"6","end":"2","weight":"9"},{"start":"0","end":"6","weight":"12"}],"nodes":{"0":{"x":82.16668701171875,"y":268.06666564941406,"label":0,"color":"Default"},"1":{"x":397.16668701171875,"y":55.06666564941406,"label":1,"color":"Default"},"2":{"x":345.16668701171875,"y":227.06666564941406,"label":2,"color":"Default"},"3":{"x":664.1666870117188,"y":89.06666564941406,"label":3,"color":"Default"},"4":{"x":453.16668701171875,"y":300.06666564941406,"label":4,"color":"Default"},"5":{"x":656.1666870117188,"y":344.06666564941406,"label":5,"color":"Default"},"6":{"x":328.16668701171875,"y":441.06666564941406,"label":6,"color":"Default"}},"selectedEdges":[{"start":"0","end":"1","weight":"12"},{"start":"0","end":"2","weight":"10"},{"start":"1","end":"3","weight":"12"},{"start":"2","end":"4","weight":"3"},{"start":"5","end":"3","weight":"10"},{"start":"6","end":"4","weight":"7"},{"start":"6","end":"5","weight":"9"}]}	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
12	1	1	Pentagon and Pentagram	Convert the Pentagram to a Pentagon.	{"edges":[{"start":"3","end":"0","weight":"0"},{"start":"0","end":"4","weight":"0"},{"start":"2","end":"4","weight":"0"},{"start":"1","end":"2","weight":"0"},{"start":"3","end":"1","weight":"0"}],"nodes":{"0":{"x":430.79998779296875,"y":40.19999694824219,"label":"","color":"Default"},"1":{"x":599.7999877929688,"y":145.1999969482422,"label":"","color":"Default"},"2":{"x":274.79998779296875,"y":146.1999969482422,"label":"","color":"Default"},"3":{"x":324.79998779296875,"y":330.1999969482422,"label":"","color":"Default"},"4":{"x":545.7999877929688,"y":332.1999969482422,"label":"","color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":false,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":true,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\r\n *\r\n * @param {Object} data - An object containing nodes and edges properties.\r\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\r\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\r\n * @returns {boolean} True if the solution is valid, otherwise false.\r\n */\r\n\r\nfunction isIntersecting(a, b, c, d) {\r\n    // Returns true if line segment (a, b) intersects with line segment (c, d)\r\n    function ccw(a, b, c) {\r\n        return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);\r\n    }\r\n\r\n    return (\r\n        ccw(a, c, d) !== ccw(b, c, d) &&\r\n        ccw(a, b, c) !== ccw(a, b, d)\r\n    );\r\n}\r\n\r\n\r\nfunction hasCommonNode(edgeA, edgeB) {\r\n    return (\r\n        edgeA.start === edgeB.start ||\r\n        edgeA.start === edgeB.end ||\r\n        edgeA.end === edgeB.start ||\r\n        edgeA.end === edgeB.end\r\n    );\r\n}\r\n\r\nfunction solutionChecker(data) {\r\n    const nodes = data.nodes;\r\n    const edges = data.edges;\r\n\r\n    for (let i = 0; i < edges.length; i++) {\r\n        const edgeA = edges[i];\r\n        \r\n        const startA = nodes[edgeA.start];\r\n        const endA = nodes[edgeA.end];\r\n\r\n        for (let j = i + 1; j < edges.length; j++) {\r\n            const edgeB = edges[j];\r\n\r\n            const startB = nodes[edgeB.start];\r\n            const endB = nodes[edgeB.end];\r\n\r\n            if (\r\n                isIntersecting(startA, endA, startB, endB) &&\r\n                !hasCommonNode(edgeA, edgeB)\r\n            ) {\r\n                // console.log(startA.x,startA.y,  startB.x, startB.y, endA.x, endA.y, endB.x, endB.y)\r\n                return false;\r\n            }\r\n        }\r\n    }\r\n\r\n    // No intersections found, it's a plane graph\r\n    return true;\r\n}	\N	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
13	1	1	Dijkstra	Find shortest path from A to F.	{"edges":[{"start":"0","end":"1","weight":"4"},{"start":"0","end":"2","weight":"2"},{"start":"2","end":"4","weight":"3"},{"start":"1","end":"2","weight":"5"},{"start":"1","end":"3","weight":"10"},{"start":"4","end":"3","weight":"4"},{"start":"3","end":"5","weight":"11"}],"nodes":{"0":{"x":166.79998779296875,"y":198.4666748046875,"label":"A","color":"Default"},"1":{"x":326.79998779296875,"y":71.4666748046875,"label":"B","color":"Default"},"2":{"x":316.79998779296875,"y":284.4666748046875,"label":"C","color":"Default"},"3":{"x":493.79998779296875,"y":75.4666748046875,"label":"D","color":"Default"},"4":{"x":521.7999877929688,"y":275.4666748046875,"label":"E","color":"Default"},"5":{"x":700.7999877929688,"y":168.4666748046875,"label":"F","color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":true,"type":"switch"},"weightedEdge":{"value":true,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"edges":[{"start":"0","end":"1","weight":"4"},{"start":"0","end":"2","weight":"2"},{"start":"2","end":"4","weight":"3"},{"start":"1","end":"2","weight":"5"},{"start":"1","end":"3","weight":"10"},{"start":"4","end":"3","weight":"4"},{"start":"3","end":"5","weight":"11"}],"nodes":{"0":{"x":166.79998779296875,"y":198.4666748046875,"label":"A","color":"Default"},"1":{"x":326.79998779296875,"y":71.4666748046875,"label":"B","color":"Default"},"2":{"x":316.79998779296875,"y":284.4666748046875,"label":"C","color":"Default"},"3":{"x":493.79998779296875,"y":75.4666748046875,"label":"D","color":"Default"},"4":{"x":521.7999877929688,"y":275.4666748046875,"label":"E","color":"Default"},"5":{"x":700.7999877929688,"y":168.4666748046875,"label":"F","color":"Default"}},"selectedEdges":[{"start":"0","end":"2","weight":"2"},{"start":"2","end":"4","weight":"3"},{"start":"3","end":"5","weight":"11"},{"start":"4","end":"3","weight":"4"}]}	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
14	1	1	Wandering Merchant Dilemma	Given a connected graph representing a network of cities and the roads connecting them, your mission is to unravel the optimal cycle for a traveling salesman. The challenge is to identify a closed loop that traverses each city exactly once, allowing the salesman to showcase their merchandise in a cyclic journey. Develop a program to discover the Graphical Sales Circuit in the given graph, providing the sequence of cities that forms the most efficient cycle, ensuring maximum coverage and minimal travel distance.	{"edges":[{"start":"1","end":"0","weight":"10"},{"start":"0","end":"2","weight":"15"},{"start":"1","end":"2","weight":"35"},{"start":"0","end":"3","weight":"20"},{"start":"3","end":"2","weight":"30"},{"start":"1","end":"3","weight":"25"}],"nodes":{"0":{"x":409.16668701171875,"y":67.06666564941406,"label":0,"color":"Default"},"1":{"x":214.16668701171875,"y":328.06666564941406,"label":1,"color":"Default"},"2":{"x":646.1666870117188,"y":368.0500030517578,"label":2,"color":"Default"},"3":{"x":414.16668701171875,"y":236.86666870117188,"label":3,"color":"Default"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":true,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":false,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":false,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"edges":[{"start":"1","end":"0","weight":"10"},{"start":"0","end":"2","weight":"15"},{"start":"1","end":"2","weight":"35"},{"start":"0","end":"3","weight":"20"},{"start":"3","end":"2","weight":"30"},{"start":"1","end":"3","weight":"25"}],"nodes":{"0":{"x":409.16668701171875,"y":67.06666564941406,"label":0,"color":"Default"},"1":{"x":214.16668701171875,"y":328.06666564941406,"label":1,"color":"Default"},"2":{"x":646.1666870117188,"y":368.0500030517578,"label":2,"color":"Default"},"3":{"x":414.16668701171875,"y":236.86666870117188,"label":3,"color":"Default"}},"selectedEdges":[{"start":"0","end":"2","weight":"15"},{"start":"1","end":"0","weight":"10"},{"start":"1","end":"3","weight":"25"},{"start":"3","end":"2","weight":"30"}]}	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
15	1	1	Red Black	Delete 5.	{"edges":[{"start":"1","end":"3","weight":"0"},{"start":"1","end":"4","weight":"0"},{"start":"1","end":"0","weight":"0"},{"start":"0","end":"2","weight":"0"},{"start":"2","end":"5","weight":"0"},{"start":"2","end":"6","weight":"0"}],"nodes":{"0":{"x":451.16668701171875,"y":54.46665954589844,"label":0,"color":"Black"},"1":{"x":327.16668701171875,"y":183.46665954589844,"label":1,"color":"Red"},"2":{"x":561.1666870117188,"y":183.46665954589844,"label":2,"color":"Red"},"3":{"x":159.16668701171875,"y":235.46665954589844,"label":3,"color":"Black"},"4":{"x":366.16668701171875,"y":337.46665954589844,"label":4,"color":"Black"},"5":{"x":533.1666870117188,"y":336.46665954589844,"label":5,"color":"Black"},"6":{"x":739.1666870117188,"y":234.46665954589844,"label":6,"color":"Black"}},"selectedEdges":[]}	{"directedEdge":{"value":false,"type":"switch"},"weightedEdge":{"value":false,"type":"switch"}}	{"addNode":{"value":false,"type":"switch"},"deleteNode":{"value":false,"type":"switch"},"dragNode":{"value":true,"type":"switch"},"addEdge":{"value":false,"type":"switch"},"deleteEdge":{"value":true,"type":"switch"},"editWeight":{"value":false,"type":"switch"},"editColor":{"value":false,"type":"switch"}}	/**\n *\n * @param {Object} data - An object containing nodes and edges properties.\n * @param {Array} data.nodes - Array of nodes. Where each node is an object with x,y properties.\n * @param {Array} data.edges - Array of edges. Where each edge is an object with start, end properties.\n * @returns {boolean} True if the solution is valid, otherwise false.\n */\nfunction solutionChecker(userCanvas,solutionCanvas,userActivity) {\n  return JSON.stringify(userCanvas) === JSON.stringify(solutionCanvas);\n}\n	{"edges":[],"nodes":{},"selectedEdges":[]}	2024-02-04 23:23:42.663+06	2024-02-04 23:23:42.663+06
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20240108194219-create-topic.js
20240108230613-create-user.js
20240109105036-create-series.js
20240109105531-create-canvas.js
20240109110734-create-setter.js
20240109112024-create-problem.js
20240109113225-create-problem-version.js
20240109120126-create-credential.js
20240109135742-create-activity.js
20240109140024-create-contest.js
20240109140232-create-submission.js
20240109140413-create-contest-setter.js
20240109140541-create-contest-problem.js
20240109140641-create-participant.js
20240109140714-create-contest-submission.js
20240109141134-create-clarification.js
20240124113856-create-email-verification.js
20240203063241-create-daily-activity.js
\.


--
-- Data for Name: Series; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Series" (id, "topicId", name, description, logo, "isLive", "serialNo", "createdAt", "updatedAt") FROM stdin;
1	2	Tower Of Hanoi		https://us.123rf.com/450wm/ylivdesign/ylivdesign1701/ylivdesign170109038/70429747-colorful-pyramid-toy-icon-cartoon-illustration-of-colorful-pyramid-toy-vector-icon-for-web.jpg?ver=6	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
2	4	Spanning Tree		https://blog-c7ff.kxcdn.com/blog/wp-content/uploads/2017/01/blog-10.jpg	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
3	1	Shortest Path		https://media.istockphoto.com/id/1204141542/vector/easy-straight-complicated-paths.jpg?s=612x612&w=0&k=20&c=93R6hIIAEw2rTicfqNuj2GLfwPdDSLNruVrgx_O_DYA=	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
4	1	Graph Coloring		https://static.vecteezy.com/system/resources/previews/029/583/668/original/color-icon-for-node-vector.jpg	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
5	1	Isomorphism		https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d1df5349-0b0f-4d07-a13d-c59daaae9f90/dg53ht0-d224bd39-3578-42c6-acd9-0336c3f641da.jpg/v1/fill/w_904,h_884,q_70,strp/spiderman_meme_by_yostverseeditsmarvel_dg53ht0-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA1NyIsInBhdGgiOiJcL2ZcL2QxZGY1MzQ5LTBiMGYtNGQwNy1hMTNkLWM1OWRhYWFlOWY5MFwvZGc1M2h0MC1kMjI0YmQzOS0zNTc4LTQyYzYtYWNkOS0wMzM2YzNmNjQxZGEuanBnIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.cv9Q8FgnY5Doy3JMOQaw6tkNp2wZ75eC1KiMELUhYas	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
6	1	Travelling Salesman		https://media.istockphoto.com/id/1227007210/vector/business-decision-modern-businessman-standing-in-front-of-signpost-showing-different.jpg?s=612x612&w=0&k=20&c=0joKPEsJLRtPPC6WTnsZZg2MCmHPD-K6wj2c1hcp1VA=	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
7	1	Planar Graph		https://miro.medium.com/v2/resize:fit:1400/1*Xo-W6UucD0e2gmOB5wescg.gif	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
8	1	Bipartite Graph		https://miro.medium.com/v2/resize:fit:588/0*PWKRBToddj9I36q4.gif	f	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
9	4	Red Black		https://thumbs.dreamstime.com/b/illustration-black-tree-red-apples-vector-55899640.jpg	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
10	1	BFS		https://miro.medium.com/v2/resize:fit:4800/format:webp/1*fYKrGW0IUeoS_8XtCoNaLw.gif	f	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
11	1	Max Flow Min Cut		https://uploads.toptal.io/blog/image/124061/toptal-blog-image-1503922944233-918c6faefd88554e45442287ce635def.gif	f	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
12	3	Bubble Sort		https://res.cloudinary.com/practicaldev/image/fetch/s--tZV8xTN4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.imgur.com/p36pPuu.gif	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
13	3	Selection Sort		https://res.cloudinary.com/practicaldev/image/fetch/s--6bITq5rX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_800/https://i0.wp.com/algorithms.tutorialhorizon.com/files/2019/01/Selection-Sort-Gif.gif%3Fzoom%3D1.25%26fit%3D300%252C214%26ssl%3D1	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
14	3	Quick Sort		https://assets.digitalocean.com/articles/alligator/js/quick-sort/quick-sort-animation.gif	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
15	3	Merge Sort		https://assets.digitalocean.com/articles/alligator/js/understanding-merge-sort/merge-sort-animation.gif	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
16	2	N Queen		https://meetwithbudhi.files.wordpress.com/2019/09/prog.gif	t	0	2024-02-04 23:23:45.239+06	2024-02-04 23:23:45.239+06
\.


--
-- Data for Name: Setters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Setters" (id, "userId", "isApproved", "createdAt", "updatedAt") FROM stdin;
1	1	t	2024-02-04 23:23:42.645+06	2024-02-04 23:23:42.645+06
2	3	t	2024-02-04 23:23:42.645+06	2024-02-04 23:23:42.645+06
3	5	f	2024-02-04 23:23:42.645+06	2024-02-04 23:23:42.645+06
4	8	f	2024-02-04 23:23:42.645+06	2024-02-04 23:23:42.645+06
5	9	f	2024-02-04 23:23:42.645+06	2024-02-04 23:23:42.645+06
\.


--
-- Data for Name: Submissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Submissions" (id, "problemId", "userId", verdict, "canvasData", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Topics" (id, name, description, logo, "isLive", "serialNo", "createdAt", "updatedAt") FROM stdin;
1	Graph	Nodes and Edges	https://cdn4.iconfinder.com/data/icons/university-32/500/yul651_20_atom_molecule_business_logo_texture_technology_chemistry-512.png	t	0	2024-02-04 23:23:45.23+06	2024-02-04 23:23:45.23+06
2	Recursion	\N	https://www.svgrepo.com/show/439287/recursion.svg	t	0	2024-02-04 23:23:45.23+06	2024-02-04 23:23:45.23+06
3	Sorting	\N	https://cdn1.iconfinder.com/data/icons/flat-web-browser/100/sort-512.png	t	0	2024-02-04 23:23:45.23+06	2024-02-04 23:23:45.23+06
4	Tree	\N	https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS7-pjys5IOotbaoxbBlxDklbg6YEPMwLcS0GOlOgRtEBWP_bQU	t	0	2024-02-04 23:23:45.23+06	2024-02-04 23:23:45.23+06
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, fullname, username, image, "createdAt", "updatedAt") FROM stdin;
1	Mahir Labib Dihan	mahirlabibdihan	/images/dihan.jpg	2024-02-04 23:23:42.576+06	2024-02-04 23:23:42.576+06
2	Mahir Labib Dihan	dihan	/images/dihan.jpg	2024-02-04 23:23:42.576+06	2024-02-04 23:23:42.576+06
3	Sayem Shahad Soummo	sayemshahadsoummo	/images/sayem.jpg	2024-02-04 23:23:42.576+06	2024-02-04 23:23:42.576+06
4	Sayem Shahad Soummo	sayem	/images/sayem.jpg	2024-02-04 23:23:42.576+06	2024-02-04 23:23:42.576+06
5	Souvik Ghosh	sheldor7701	/images/souvik.jpg	2024-02-04 23:23:42.576+06	2024-02-04 23:23:42.576+06
6	Souvik Ghosh	souvik	/images/souvik.jpg	2024-02-04 23:23:42.576+06	2024-02-04 23:23:42.576+06
7	\N	admin	\N	2024-02-04 23:23:42.576+06	2024-02-04 23:23:42.576+06
8	Roqunuzzaman Sojib	roqun	https://pics.craiyon.com/2023-09-13/c195261e4ae94815a26761786726d83a.webp	2024-02-04 23:23:42.576+06	2024-02-04 23:23:42.576+06
9	Ami Sakib	sakib	https://cdn.prod.www.spiegel.de/images/d2caafb1-70da-47e2-ba48-efd66565cde1_w1024_r0.9975262832405689_fpx44.98_fpy48.86.jpg	2024-02-04 23:23:42.576+06	2024-02-04 23:23:42.576+06
\.


--
-- Name: Activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Activities_id_seq"', 1, false);


--
-- Name: Canvases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Canvases_id_seq"', 2, true);


--
-- Name: Clarifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Clarifications_id_seq"', 1, false);


--
-- Name: ContestProblems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ContestProblems_id_seq"', 1, true);


--
-- Name: ContestSetters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ContestSetters_id_seq"', 1, true);


--
-- Name: ContestSubmissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ContestSubmissions_id_seq"', 1, false);


--
-- Name: Contests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Contests_id_seq"', 1, true);


--
-- Name: Credentials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Credentials_id_seq"', 7, true);


--
-- Name: DailyActivities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DailyActivities_id_seq"', 1, false);


--
-- Name: EmailVerifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EmailVerifications_id_seq"', 1, false);


--
-- Name: Participants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Participants_id_seq"', 1, false);


--
-- Name: ProblemVersions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProblemVersions_id_seq"', 14, true);


--
-- Name: Problems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Problems_id_seq"', 15, true);


--
-- Name: Series_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Series_id_seq"', 16, true);


--
-- Name: Setters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Setters_id_seq"', 5, true);


--
-- Name: Submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Submissions_id_seq"', 1, false);


--
-- Name: Topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Topics_id_seq"', 4, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 9, true);


--
-- Name: Activities Activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Activities"
    ADD CONSTRAINT "Activities_pkey" PRIMARY KEY (id);


--
-- Name: Activities Activities_userId_problemId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Activities"
    ADD CONSTRAINT "Activities_userId_problemId_key" UNIQUE ("userId", "problemId");


--
-- Name: Canvases Canvases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Canvases"
    ADD CONSTRAINT "Canvases_pkey" PRIMARY KEY (id);


--
-- Name: Clarifications Clarifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clarifications"
    ADD CONSTRAINT "Clarifications_pkey" PRIMARY KEY (id);


--
-- Name: ContestProblems ContestProblems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestProblems"
    ADD CONSTRAINT "ContestProblems_pkey" PRIMARY KEY (id);


--
-- Name: ContestSetters ContestSetters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestSetters"
    ADD CONSTRAINT "ContestSetters_pkey" PRIMARY KEY (id);


--
-- Name: ContestSubmissions ContestSubmissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestSubmissions"
    ADD CONSTRAINT "ContestSubmissions_pkey" PRIMARY KEY (id);


--
-- Name: Contests Contests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contests"
    ADD CONSTRAINT "Contests_pkey" PRIMARY KEY (id);


--
-- Name: Credentials Credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Credentials"
    ADD CONSTRAINT "Credentials_pkey" PRIMARY KEY (id);


--
-- Name: Credentials Credentials_userId_role_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Credentials"
    ADD CONSTRAINT "Credentials_userId_role_key" UNIQUE (email, role);


--
-- Name: DailyActivities DailyActivities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DailyActivities"
    ADD CONSTRAINT "DailyActivities_pkey" PRIMARY KEY (id);


--
-- Name: DailyActivities DailyActivities_userId_activityDate_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DailyActivities"
    ADD CONSTRAINT "DailyActivities_userId_activityDate_key" UNIQUE ("userId", "activityDate");


--
-- Name: EmailVerifications EmailVerifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EmailVerifications"
    ADD CONSTRAINT "EmailVerifications_pkey" PRIMARY KEY (id);


--
-- Name: Participants Participants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Participants"
    ADD CONSTRAINT "Participants_pkey" PRIMARY KEY (id);


--
-- Name: ProblemVersions ProblemVersions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProblemVersions"
    ADD CONSTRAINT "ProblemVersions_pkey" PRIMARY KEY (id);


--
-- Name: Problems Problems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Problems"
    ADD CONSTRAINT "Problems_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Series Series_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Series"
    ADD CONSTRAINT "Series_pkey" PRIMARY KEY (id);


--
-- Name: Setters Setters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Setters"
    ADD CONSTRAINT "Setters_pkey" PRIMARY KEY (id);


--
-- Name: Submissions Submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Submissions"
    ADD CONSTRAINT "Submissions_pkey" PRIMARY KEY (id);


--
-- Name: Topics Topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Topics"
    ADD CONSTRAINT "Topics_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: ProblemVersions copy_problem_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER copy_problem_trigger BEFORE INSERT ON public."ProblemVersions" FOR EACH ROW EXECUTE FUNCTION public.copy_problem_to_version();


--
-- Name: Activities Activities_problemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Activities"
    ADD CONSTRAINT "Activities_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES public."ProblemVersions"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Activities Activities_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Activities"
    ADD CONSTRAINT "Activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Clarifications Clarifications_contestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clarifications"
    ADD CONSTRAINT "Clarifications_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES public."Contests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContestProblems ContestProblems_contestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestProblems"
    ADD CONSTRAINT "ContestProblems_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES public."Contests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContestProblems ContestProblems_problemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestProblems"
    ADD CONSTRAINT "ContestProblems_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES public."Problems"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContestSetters ContestSetters_contestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestSetters"
    ADD CONSTRAINT "ContestSetters_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES public."Contests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContestSetters ContestSetters_setterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestSetters"
    ADD CONSTRAINT "ContestSetters_setterId_fkey" FOREIGN KEY ("setterId") REFERENCES public."Setters"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContestSubmissions ContestSubmissions_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestSubmissions"
    ADD CONSTRAINT "ContestSubmissions_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Participants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContestSubmissions ContestSubmissions_submissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContestSubmissions"
    ADD CONSTRAINT "ContestSubmissions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES public."Submissions"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Credentials Credentials_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Credentials"
    ADD CONSTRAINT "Credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DailyActivities DailyActivities_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DailyActivities"
    ADD CONSTRAINT "DailyActivities_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EmailVerifications EmailVerifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EmailVerifications"
    ADD CONSTRAINT "EmailVerifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Participants Participants_contestId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Participants"
    ADD CONSTRAINT "Participants_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES public."Contests"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Participants Participants_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Participants"
    ADD CONSTRAINT "Participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProblemVersions ProblemVersions_canvasId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProblemVersions"
    ADD CONSTRAINT "ProblemVersions_canvasId_fkey" FOREIGN KEY ("canvasId") REFERENCES public."Setters"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProblemVersions ProblemVersions_problemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProblemVersions"
    ADD CONSTRAINT "ProblemVersions_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES public."Problems"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ProblemVersions ProblemVersions_seriesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProblemVersions"
    ADD CONSTRAINT "ProblemVersions_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES public."Series"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Problems Problems_canvasId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Problems"
    ADD CONSTRAINT "Problems_canvasId_fkey" FOREIGN KEY ("canvasId") REFERENCES public."Canvases"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Problems Problems_setterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Problems"
    ADD CONSTRAINT "Problems_setterId_fkey" FOREIGN KEY ("setterId") REFERENCES public."Setters"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Series Series_topicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Series"
    ADD CONSTRAINT "Series_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topics"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Setters Setters_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Setters"
    ADD CONSTRAINT "Setters_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Submissions Submissions_problemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Submissions"
    ADD CONSTRAINT "Submissions_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES public."ProblemVersions"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Submissions Submissions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Submissions"
    ADD CONSTRAINT "Submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

