-- CREATE TABLE
CREATE TABLE PROJ.TB_PROJECT_INFO (
  PROJECT_SEQ INT AUTO_INCREMENT PRIMARY KEY, -- 프로젝트SEQ
  PROJECT_NAME VARCHAR(50),                   -- 프로젝트명
  PROJECT_DESC VARCHAR(500),                  -- 프로젝트설명
  START_DATE DATE,                            -- 시작일
  END_DATE DATE,                              -- 종료일
  COMPANY_CD VARCHAR(50),                     -- 회사코드
  REG_DATE DATE,                              -- 생성일
  REG_ID VARCHAR(50),                         -- 생성자ID
  MOD_DATE DATE,                              -- 수정일
  MOD_ID VARCHAR(50)                          -- 수정자ID
);

CREATE TABLE PROJ.TB_COMPANY_INFO (
  COMPANY_CD VARCHAR(50) PRIMARY KEY, -- 회사코드
  COMPANY_NAME VARCHAR(50)            -- 회사명
);

CREATE TABLE PROJ.TB_USER_INFO (
  USER_ID VARCHAR(50) PRIMARY KEY,    -- 사용자ID
  USER_NAME VARCHAR(50),              -- 사용자명
  PASSWORD VARCHAR(50),               -- 비밀번호
  COMPANY_CD VARCHAR(50),             -- 회사코드
  AUTH_KEY VARCHAR(50),               -- 인증키
  AUTH_YN CHAR(1) DEFAULT 'N',        -- 로그인권한
  COMP_ADMIN_YN CHAR(1) DEFAULT 'N',  -- 회사관리자권한
  JOIN_DATE DATE,                      -- 가입일
  FOREIGN KEY (COMPANY_CD) REFERENCES TB_COMPANY_INFO(COMPANY_CD)
);

CREATE TABLE PROJ.TB_PROJECT_MEMBER (
  PROJECT_SEQ INT,                    -- 프로젝트SEQ
  USER_ID VARCHAR(50),                -- 사용자ID
  REG_YN CHAR(1) DEFAULT 'N',         -- 생성자유무
  MASTER_YN CHAR(1) DEFAULT 'N',      -- 관리자유무
  FAVORITES_YN CHAR(1) DEFAULT 'N',   -- 즐겨찾기유무
  REG_DATE DATE,                      -- 생성일
  PRIMARY KEY (PROJECT_SEQ, USER_ID),
  FOREIGN KEY (PROJECT_SEQ) REFERENCES TB_PROJECT_INFO(PROJECT_SEQ),
  FOREIGN KEY (USER_ID) REFERENCES TB_USER_INFO(USER_ID)
);

CREATE TABLE PROJ.TB_TASK_INFO (
  TASK_SEQ INT AUTO_INCREMENT PRIMARY KEY,  -- 업무SEQ
  PROJECT_SEQ INT,                          -- 프로젝트SEQ
  TASK_NAME VARCHAR(50),                    -- 업무명
  TASK_DESC VARCHAR(500),                   -- 업무설명
  START_DATE DATE,                          -- 시작일
  END_DATE DATE,                            -- 종료일
  TASK_STATUS VARCHAR(50),                  -- 업무상태
  TASK_PROGRESS INT,                        -- 업무진행률
  REG_DATE DATE,                            -- 생성일
  REG_ID VARCHAR(50),                       -- 생성자
  MOD_DATE DATE,                            -- 수정일
  MOD_ID VARCHAR(50),                       -- 수정자ID
  FOREIGN KEY (PROJECT_SEQ) REFERENCES TB_PROJECT_INFO(PROJECT_SEQ)
);

CREATE TABLE PROJ.TB_TASK_MEMBER (
  TASK_SEQ INT,                      -- 업무SEQ
  USER_ID VARCHAR(50),               -- 사용자ID
  MASTER_YN CHAR(1) DEFAULT 'N',     -- 관리자유무
  REG_DATE DATE,                     -- 생성일
  PRIMARY KEY (TASK_SEQ, USER_ID),
  FOREIGN KEY (TASK_SEQ) REFERENCES TB_TASK_INFO(TASK_SEQ),
  FOREIGN KEY (USER_ID) REFERENCES TB_USER_INFO(USER_ID)
);

CREATE TABLE PROJ.TB_TASK_REPLY (
  REPLY_SEQ INT AUTO_INCREMENT PRIMARY KEY, -- 댓글SEQ
  UP_REPLY_SEQ INT,                         -- 상위댓글SEQ
  USER_ID VARCHAR(50),                      -- 사용자ID
  TASK_SEQ INT,                             -- 업무SEQ
  REPLY VARCHAR(500),                       -- 댓글
  REG_DATE DATE,                            -- 작성일
  MOD_DATE DATE,                            -- 수정일
  FOREIGN KEY (USER_ID) REFERENCES TB_USER_INFO(USER_ID),
  FOREIGN KEY (TASK_SEQ) REFERENCES TB_TASK_INFO(TASK_SEQ)
);

CREATE TABLE PROJ.TB_ALARM (
  ALARM_SEQ INT AUTO_INCREMENT PRIMARY KEY, -- 알람SEQ
  PROJECT_SEQ INT,                          -- 프로젝트SEQ
  TASK_SEQ INT,                             -- 업무SEQ
  USER_ID VARCHAR(50),                      -- 사용자ID
  ALARM_CONTENTS VARCHAR(500),              -- 알람내용
  ALARM_TYPE CHAR(1),                       -- 알람타입
  READ_YN CHAR(1) DEFAULT 'N',              -- 읽음유무
  REG_DATE DATE,                            -- 생성일
  FOREIGN KEY (USER_ID) REFERENCES TB_USER_INFO(USER_ID),
  FOREIGN KEY (TASK_SEQ) REFERENCES TB_TASK_INFO(TASK_SEQ),
  FOREIGN KEY (PROJECT_SEQ) REFERENCES TB_PROJECT_INFO(PROJECT_SEQ)
);

CREATE TABLE PROJ.TB_PROJECT_INVITE (
  INVITE_SEQ INT AUTO_INCREMENT PRIMARY KEY,  -- 초대SEQ
  PROJECT_SEQ INT,                            -- 프로젝트SEQ
  USER_ID VARCHAR(50),                        -- 사용자ID
  AUTH_KEY VARCHAR(50),                       -- 인증키
  APPR_DATE DATE,                             -- 승인일
  REG_DATE DATE,                              -- 생성일
  REG_ID VARCHAR(50),                         -- 생성자
  FOREIGN KEY (PROJECT_SEQ) REFERENCES TB_PROJECT_INFO(PROJECT_SEQ),
  FOREIGN KEY (USER_ID) REFERENCES TB_USER_INFO(USER_ID)
);

CREATE TABLE PROJ.TB_COMMON_CODE (
  COMMON_CD_SEQ INT AUTO_INCREMENT PRIMARY KEY, -- 코드SEQ
  COMMON_CD VARCHAR(50),                        -- 코드
  COMMON_CD_VAL VARCHAR(50),                    -- 코드값
  COMMON_CD_NAME VARCHAR(50)                    -- 코드명
);

-- Foreign Key Constraints
ALTER TABLE PROJ.TB_USER_INFO ADD FOREIGN KEY (COMPANY_CD) REFERENCES TB_COMPANY_INFO(COMPANY_CD);
ALTER TABLE PROJ.TB_PROJECT_INFO ADD FOREIGN KEY (COMPANY_CD) REFERENCES TB_COMPANY_INFO(COMPANY_CD);
