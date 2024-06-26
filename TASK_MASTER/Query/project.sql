-- CREATE TABLE
CREATE TABLE "TB_PROJECT_INFO" (
  "PROJECT_SEQ" NUMBER PRIMARY KEY, -- 프로젝트SEQ
  "PROJECT_NAME" VARCHAR(50),       -- 프로젝트명
  "PROJECT_DESC" VARCHAR(500),      -- 프로젝트설명
  "START_DATE" DATE,                -- 시작일
  "END_DATE" DATE,                  -- 종료일
  "COMPANY_CD" VARCHAR(50),         -- 회사코드
  "REG_DATE" DATE,                  -- 생성일
  "REG_ID" VARCHAR(50),             -- 생성자ID
  "MOD_DATE" DATE,                  -- 수정일
  "MOD_ID" VARCHAR(50)              -- 수정자ID
);

COMMENT ON TABLE TB_PROJECT_INFO IS '프로젝트 정보';
COMMENT ON COLUMN TB_PROJECT_INFO.PROJECT_SEQ IS '프로젝트SEQ';
COMMENT ON COLUMN TB_PROJECT_INFO.PROJECT_NAME IS '프로젝트명';
COMMENT ON COLUMN TB_PROJECT_INFO.PROJECT_DESC IS '프로젝트설명';
COMMENT ON COLUMN TB_PROJECT_INFO.START_DATE IS '시작일';
COMMENT ON COLUMN TB_PROJECT_INFO.END_DATE IS '종료일';
COMMENT ON COLUMN TB_PROJECT_INFO.COMPANY_CD IS '회사코드';
COMMENT ON COLUMN TB_PROJECT_INFO.REG_DATE IS '생성일';
COMMENT ON COLUMN TB_PROJECT_INFO.REG_ID IS '생성자ID';
COMMENT ON COLUMN TB_PROJECT_INFO.MOD_DATE IS '수정일';
COMMENT ON COLUMN TB_PROJECT_INFO.MOD_ID IS '수정자ID';

CREATE TABLE "TB_USER_INFO" (
  "USER_ID" VARCHAR(50) PRIMARY KEY,        -- 사용자ID
  "USER_NAME" VARCHAR(50),                  -- 사용자명
  "PASSWORD" VARCHAR(50),                   -- 비밀번호
  "COMPANY_CD" VARCHAR(50),                 -- 회사코드
  "AUTH_KEY" VARCHAR(50),                   -- 인증키
  "AUTH_YN" VARCHAR(1) DEFAULT 'N',         -- 로그인권한
  "COMP_ADMIN_YN" VARCHAR(1) DEFAULT 'N',   -- 회사관리자권한
  "JOIN_DATE" DATE                          -- 가입일
);

COMMENT ON TABLE TB_USER_INFO IS '사용자 정보';
COMMENT ON COLUMN TB_USER_INFO.USER_ID IS '사용자ID';
COMMENT ON COLUMN TB_USER_INFO.USER_NAME IS '사용자명';
COMMENT ON COLUMN TB_USER_INFO.PASSWORD IS '비밀번호';
COMMENT ON COLUMN TB_USER_INFO.COMPANY_CD IS '회사코드';
COMMENT ON COLUMN TB_USER_INFO.AUTH_KEY IS '인증키';
COMMENT ON COLUMN TB_USER_INFO.AUTH_YN IS '로그인권한';
COMMENT ON COLUMN TB_USER_INFO.COMP_ADMIN_YN IS '회사관리자권한';
COMMENT ON COLUMN TB_USER_INFO.JOIN_DATE IS '가입일';

CREATE TABLE "TB_COMPANY_INFO" (
  "COMPANY_CD" VARCHAR(50) PRIMARY KEY, -- 회사코드
  "COMPANY_NAME" VARCHAR(50)            -- 회사명
);

COMMENT ON TABLE TB_COMPANY_INFO IS '회사 정보';
COMMENT ON COLUMN TB_COMPANY_INFO.COMPANY_CD IS '회사코드';
COMMENT ON COLUMN TB_COMPANY_INFO.COMPANY_NAME IS '회사명';

CREATE TABLE "TB_PROJECT_MEMBER" (
  "PROJECT_SEQ" NUMBER,                   -- 프로젝트SEQ
  "USER_ID" VARCHAR(50),                  -- 사용자ID
  "REG_YN" VARCHAR(1) DEFAULT 'N',        -- 생성자유무
  "MASTER_YN" VARCHAR(1) DEFAULT 'N',     -- 관리자유무
  "FAVORITES_YN" VARCHAR(1) DEFAULT 'N',  -- 즐겨찾기유무
  "REG_DATE" DATE,                        -- 생성일
  CONSTRAINT PROJECT_MEMBER_PK PRIMARY KEY(PROJECT_SEQ, USER_ID)
);

COMMENT ON TABLE TB_PROJECT_MEMBER IS '프로젝트 멤버';
COMMENT ON COLUMN TB_PROJECT_MEMBER.PROJECT_SEQ IS '프로젝트SEQ';
COMMENT ON COLUMN TB_PROJECT_MEMBER.USER_ID IS '사용자ID';
COMMENT ON COLUMN TB_PROJECT_MEMBER.REG_YN IS '생성자유무';
COMMENT ON COLUMN TB_PROJECT_MEMBER.MASTER_YN IS '관리자유무';
COMMENT ON COLUMN TB_PROJECT_MEMBER.FAVORITES_YN IS '즐겨찾기유무';
COMMENT ON COLUMN TB_PROJECT_MEMBER.REG_DATE IS '생성일';

CREATE TABLE "TB_TASK_INFO" (
  "TASK_SEQ" NUMBER PRIMARY KEY,  -- 업무SEQ
  "PROJECT_SEQ" NUMBER,           -- 프로젝트SEQ
  "TASK_NAME" VARCHAR(50),        -- 업무명
  "TASK_DESC" VARCHAR(500),       -- 업무설명
  "START_DATE" DATE,              -- 시작일
  "END_DATE" DATE,                -- 종료일
  "TASK_STATUS" VARCHAR(50),      -- 업무상태
  "TASK_PROGRESS" NUMBER,         -- 업무진행률
  "REG_DATE" DATE,                -- 생성일
  "REG_ID" VARCHAR(50),           -- 생성자
  "MOD_DATE" DATE,                -- 수정일
  "MOD_ID" VARCHAR(50)            -- 수정자ID
);

COMMENT ON TABLE TB_TASK_INFO IS '업무 정보';
COMMENT ON COLUMN TB_TASK_INFO.TASK_SEQ IS '업무SEQ';
COMMENT ON COLUMN TB_TASK_INFO.PROJECT_SEQ IS '프로젝트SEQ';
COMMENT ON COLUMN TB_TASK_INFO.TASK_NAME IS '업무명';
COMMENT ON COLUMN TB_TASK_INFO.TASK_DESC IS '업무설명';
COMMENT ON COLUMN TB_TASK_INFO.START_DATE IS '시작일';
COMMENT ON COLUMN TB_TASK_INFO.END_DATE IS '종료일';
COMMENT ON COLUMN TB_TASK_INFO.TASK_STATUS IS '업무상태';
COMMENT ON COLUMN TB_TASK_INFO.TASK_PROGRESS IS '업무진행률';
COMMENT ON COLUMN TB_TASK_INFO.REG_DATE IS '생성일';
COMMENT ON COLUMN TB_TASK_INFO.REG_ID IS '생성자';
COMMENT ON COLUMN TB_TASK_INFO.MOD_DATE IS '수정일';
COMMENT ON COLUMN TB_TASK_INFO.MOD_ID IS '수정자ID';

CREATE TABLE "TB_TASK_MEMBER" (
  "TASK_SEQ" NUMBER,                  -- 업무SEQ
  "USER_ID" VARCHAR(50),              -- 사용자ID
  "MASTER_YN" VARCHAR(1) DEFAULT 'N', -- 관리자유무
  "REG_DATE" DATE,                    -- 생성일
  CONSTRAINT TASK_MEMBER_PK PRIMARY KEY(TASK_SEQ, USER_ID)
);

COMMENT ON TABLE TB_TASK_MEMBER IS '업무 멤버';
COMMENT ON COLUMN TB_TASK_MEMBER.TASK_SEQ IS '업무SEQ';
COMMENT ON COLUMN TB_TASK_MEMBER.USER_ID IS '사용자ID';
COMMENT ON COLUMN TB_TASK_MEMBER.MASTER_YN IS '관리자유무';
COMMENT ON COLUMN TB_TASK_MEMBER.REG_DATE IS '생성일';

CREATE TABLE "TB_TASK_REPLY" (
  "REPLY_SEQ" NUMBER PRIMARY KEY,   -- 댓글SEQ
  "USER_ID" VARCHAR(50),            -- 사용자ID
  "TASK_SEQ" NUMBER,                -- 업무SEQ
  "REPLY" VARCHAR(500),             -- 댓글
  "REG_DATE" DATE,                  -- 작성일
  "MOD_DATE" DATE                   -- 수정일
);

COMMENT ON TABLE TB_TASK_REPLY IS '업무 댓글';
COMMENT ON COLUMN TB_TASK_REPLY.REPLY_SEQ IS '댓글SEQ';
COMMENT ON COLUMN TB_TASK_REPLY.USER_ID IS '사용자ID';
COMMENT ON COLUMN TB_TASK_REPLY.TASK_SEQ IS '업무SEQ';
COMMENT ON COLUMN TB_TASK_REPLY.REPLY IS '댓글';
COMMENT ON COLUMN TB_TASK_REPLY.REG_DATE IS '작성일';
COMMENT ON COLUMN TB_TASK_REPLY.MOD_DATE IS '수정일';

CREATE TABLE "TB_COMMON_CODE" (
  "COMMON_CD_SEQ" NUMBER PRIMARY KEY, -- 코드SEQ
  "COMMON_CD" VARCHAR(50),            -- 코드
  "COMMON_CD_VAL" VARCHAR(50),        -- 코드값
  "COMMON_CD_NAME" VARCHAR(50)        -- 코드명
);

COMMENT ON TABLE TB_COMMON_CODE IS '공통코드';
COMMENT ON COLUMN TB_COMMON_CODE.COMMON_CD_SEQ IS '코드SEQ';
COMMENT ON COLUMN TB_COMMON_CODE.COMMON_CD IS '코드';
COMMENT ON COLUMN TB_COMMON_CODE.COMMON_CD_VAL IS '코드값';
COMMENT ON COLUMN TB_COMMON_CODE.COMMON_CD_NAME IS '코드명';

ALTER TABLE "TB_PROJECT_INFO" ADD FOREIGN KEY ("COMPANY_CD") REFERENCES "TB_COMPANY_INFO" ("COMPANY_CD");

ALTER TABLE "TB_USER_INFO" ADD FOREIGN KEY ("COMPANY_CD") REFERENCES "TB_COMPANY_INFO" ("COMPANY_CD");

ALTER TABLE "TB_PROJECT_MEMBER" ADD FOREIGN KEY ("PROJECT_SEQ") REFERENCES "TB_PROJECT_INFO" ("PROJECT_SEQ");

ALTER TABLE "TB_PROJECT_MEMBER" ADD FOREIGN KEY ("USER_ID") REFERENCES "TB_USER_INFO" ("USER_ID");

ALTER TABLE "TB_TASK_INFO" ADD FOREIGN KEY ("PROJECT_SEQ") REFERENCES "TB_PROJECT_INFO" ("PROJECT_SEQ");

ALTER TABLE "TB_TASK_MEMBER" ADD FOREIGN KEY ("USER_ID") REFERENCES "TB_USER_INFO" ("USER_ID");

ALTER TABLE "TB_TASK_MEMBER" ADD FOREIGN KEY ("TASK_SEQ") REFERENCES "TB_TASK_INFO" ("TASK_SEQ");

ALTER TABLE "TB_TASK_REPLY" ADD FOREIGN KEY ("USER_ID") REFERENCES "TB_USER_INFO" ("USER_ID");

ALTER TABLE "TB_TASK_REPLY" ADD FOREIGN KEY ("TASK_SEQ") REFERENCES "TB_TASK_INFO" ("TASK_SEQ");

-- CREATE SEQUENCE
CREATE SEQUENCE PROJECT_SEQ
INCREMENT BY 1
START WITH 1
MINVALUE 1
MAXVALUE 9999999999 
NOCYCLE
NOCACHE;

CREATE SEQUENCE TASK_SEQ
INCREMENT BY 1
START WITH 1
MINVALUE 1
MAXVALUE 9999999999 
NOCYCLE
NOCACHE;

CREATE SEQUENCE REPLY_SEQ
INCREMENT BY 1
START WITH 1
MINVALUE 1
MAXVALUE 9999999999 
NOCYCLE
NOCACHE;

CREATE SEQUENCE COMMON_CD_SEQ
INCREMENT BY 1
START WITH 1
MINVALUE 1
MAXVALUE 9999999999 
NOCYCLE
NOCACHE;

