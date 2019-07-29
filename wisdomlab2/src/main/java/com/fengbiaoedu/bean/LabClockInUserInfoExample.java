package com.fengbiaoedu.bean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LabClockInUserInfoExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public LabClockInUserInfoExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Long value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Long value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Long value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Long value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Long value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Long value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Long> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Long> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Long value1, Long value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Long value1, Long value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNull() {
            addCriterion("user_id is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("user_id is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(Integer value) {
            addCriterion("user_id =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(Integer value) {
            addCriterion("user_id <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(Integer value) {
            addCriterion("user_id >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("user_id >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(Integer value) {
            addCriterion("user_id <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(Integer value) {
            addCriterion("user_id <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<Integer> values) {
            addCriterion("user_id in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<Integer> values) {
            addCriterion("user_id not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(Integer value1, Integer value2) {
            addCriterion("user_id between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(Integer value1, Integer value2) {
            addCriterion("user_id not between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andNameIsNull() {
            addCriterion("name is null");
            return (Criteria) this;
        }

        public Criteria andNameIsNotNull() {
            addCriterion("name is not null");
            return (Criteria) this;
        }

        public Criteria andNameEqualTo(String value) {
            addCriterion("name =", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotEqualTo(String value) {
            addCriterion("name <>", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThan(String value) {
            addCriterion("name >", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThanOrEqualTo(String value) {
            addCriterion("name >=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThan(String value) {
            addCriterion("name <", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThanOrEqualTo(String value) {
            addCriterion("name <=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLike(String value) {
            addCriterion("name like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotLike(String value) {
            addCriterion("name not like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameIn(List<String> values) {
            addCriterion("name in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotIn(List<String> values) {
            addCriterion("name not in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameBetween(String value1, String value2) {
            addCriterion("name between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotBetween(String value1, String value2) {
            addCriterion("name not between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andUsernameIsNull() {
            addCriterion("username is null");
            return (Criteria) this;
        }

        public Criteria andUsernameIsNotNull() {
            addCriterion("username is not null");
            return (Criteria) this;
        }

        public Criteria andUsernameEqualTo(String value) {
            addCriterion("username =", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotEqualTo(String value) {
            addCriterion("username <>", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameGreaterThan(String value) {
            addCriterion("username >", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameGreaterThanOrEqualTo(String value) {
            addCriterion("username >=", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameLessThan(String value) {
            addCriterion("username <", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameLessThanOrEqualTo(String value) {
            addCriterion("username <=", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameLike(String value) {
            addCriterion("username like", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotLike(String value) {
            addCriterion("username not like", value, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameIn(List<String> values) {
            addCriterion("username in", values, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotIn(List<String> values) {
            addCriterion("username not in", values, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameBetween(String value1, String value2) {
            addCriterion("username between", value1, value2, "username");
            return (Criteria) this;
        }

        public Criteria andUsernameNotBetween(String value1, String value2) {
            addCriterion("username not between", value1, value2, "username");
            return (Criteria) this;
        }

        public Criteria andTypeIsNull() {
            addCriterion("type is null");
            return (Criteria) this;
        }

        public Criteria andTypeIsNotNull() {
            addCriterion("type is not null");
            return (Criteria) this;
        }

        public Criteria andTypeEqualTo(Byte value) {
            addCriterion("type =", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotEqualTo(Byte value) {
            addCriterion("type <>", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThan(Byte value) {
            addCriterion("type >", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThanOrEqualTo(Byte value) {
            addCriterion("type >=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThan(Byte value) {
            addCriterion("type <", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThanOrEqualTo(Byte value) {
            addCriterion("type <=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeIn(List<Byte> values) {
            addCriterion("type in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotIn(List<Byte> values) {
            addCriterion("type not in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeBetween(Byte value1, Byte value2) {
            addCriterion("type between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotBetween(Byte value1, Byte value2) {
            addCriterion("type not between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("status is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("status is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(Byte value) {
            addCriterion("status =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(Byte value) {
            addCriterion("status <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(Byte value) {
            addCriterion("status >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(Byte value) {
            addCriterion("status >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(Byte value) {
            addCriterion("status <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(Byte value) {
            addCriterion("status <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<Byte> values) {
            addCriterion("status in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<Byte> values) {
            addCriterion("status not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(Byte value1, Byte value2) {
            addCriterion("status between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(Byte value1, Byte value2) {
            addCriterion("status not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdIsNull() {
            addCriterion("origin-clockin_id is null");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdIsNotNull() {
            addCriterion("origin-clockin_id is not null");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdEqualTo(String value) {
            addCriterion("origin-clockin_id =", value, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdNotEqualTo(String value) {
            addCriterion("origin-clockin_id <>", value, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdGreaterThan(String value) {
            addCriterion("origin-clockin_id >", value, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdGreaterThanOrEqualTo(String value) {
            addCriterion("origin-clockin_id >=", value, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdLessThan(String value) {
            addCriterion("origin-clockin_id <", value, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdLessThanOrEqualTo(String value) {
            addCriterion("origin-clockin_id <=", value, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdLike(String value) {
            addCriterion("origin-clockin_id like", value, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdNotLike(String value) {
            addCriterion("origin-clockin_id not like", value, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdIn(List<String> values) {
            addCriterion("origin-clockin_id in", values, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdNotIn(List<String> values) {
            addCriterion("origin-clockin_id not in", values, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdBetween(String value1, String value2) {
            addCriterion("origin-clockin_id between", value1, value2, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andOriginClockinIdNotBetween(String value1, String value2) {
            addCriterion("origin-clockin_id not between", value1, value2, "originClockinId");
            return (Criteria) this;
        }

        public Criteria andClassIdIsNull() {
            addCriterion("class_id is null");
            return (Criteria) this;
        }

        public Criteria andClassIdIsNotNull() {
            addCriterion("class_id is not null");
            return (Criteria) this;
        }

        public Criteria andClassIdEqualTo(Integer value) {
            addCriterion("class_id =", value, "classId");
            return (Criteria) this;
        }

        public Criteria andClassIdNotEqualTo(Integer value) {
            addCriterion("class_id <>", value, "classId");
            return (Criteria) this;
        }

        public Criteria andClassIdGreaterThan(Integer value) {
            addCriterion("class_id >", value, "classId");
            return (Criteria) this;
        }

        public Criteria andClassIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("class_id >=", value, "classId");
            return (Criteria) this;
        }

        public Criteria andClassIdLessThan(Integer value) {
            addCriterion("class_id <", value, "classId");
            return (Criteria) this;
        }

        public Criteria andClassIdLessThanOrEqualTo(Integer value) {
            addCriterion("class_id <=", value, "classId");
            return (Criteria) this;
        }

        public Criteria andClassIdIn(List<Integer> values) {
            addCriterion("class_id in", values, "classId");
            return (Criteria) this;
        }

        public Criteria andClassIdNotIn(List<Integer> values) {
            addCriterion("class_id not in", values, "classId");
            return (Criteria) this;
        }

        public Criteria andClassIdBetween(Integer value1, Integer value2) {
            addCriterion("class_id between", value1, value2, "classId");
            return (Criteria) this;
        }

        public Criteria andClassIdNotBetween(Integer value1, Integer value2) {
            addCriterion("class_id not between", value1, value2, "classId");
            return (Criteria) this;
        }

        public Criteria andOperatorIdIsNull() {
            addCriterion("operator_id is null");
            return (Criteria) this;
        }

        public Criteria andOperatorIdIsNotNull() {
            addCriterion("operator_id is not null");
            return (Criteria) this;
        }

        public Criteria andOperatorIdEqualTo(Integer value) {
            addCriterion("operator_id =", value, "operatorId");
            return (Criteria) this;
        }

        public Criteria andOperatorIdNotEqualTo(Integer value) {
            addCriterion("operator_id <>", value, "operatorId");
            return (Criteria) this;
        }

        public Criteria andOperatorIdGreaterThan(Integer value) {
            addCriterion("operator_id >", value, "operatorId");
            return (Criteria) this;
        }

        public Criteria andOperatorIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("operator_id >=", value, "operatorId");
            return (Criteria) this;
        }

        public Criteria andOperatorIdLessThan(Integer value) {
            addCriterion("operator_id <", value, "operatorId");
            return (Criteria) this;
        }

        public Criteria andOperatorIdLessThanOrEqualTo(Integer value) {
            addCriterion("operator_id <=", value, "operatorId");
            return (Criteria) this;
        }

        public Criteria andOperatorIdIn(List<Integer> values) {
            addCriterion("operator_id in", values, "operatorId");
            return (Criteria) this;
        }

        public Criteria andOperatorIdNotIn(List<Integer> values) {
            addCriterion("operator_id not in", values, "operatorId");
            return (Criteria) this;
        }

        public Criteria andOperatorIdBetween(Integer value1, Integer value2) {
            addCriterion("operator_id between", value1, value2, "operatorId");
            return (Criteria) this;
        }

        public Criteria andOperatorIdNotBetween(Integer value1, Integer value2) {
            addCriterion("operator_id not between", value1, value2, "operatorId");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeIsNull() {
            addCriterion("user_privilege is null");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeIsNotNull() {
            addCriterion("user_privilege is not null");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeEqualTo(String value) {
            addCriterion("user_privilege =", value, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeNotEqualTo(String value) {
            addCriterion("user_privilege <>", value, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeGreaterThan(String value) {
            addCriterion("user_privilege >", value, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeGreaterThanOrEqualTo(String value) {
            addCriterion("user_privilege >=", value, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeLessThan(String value) {
            addCriterion("user_privilege <", value, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeLessThanOrEqualTo(String value) {
            addCriterion("user_privilege <=", value, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeLike(String value) {
            addCriterion("user_privilege like", value, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeNotLike(String value) {
            addCriterion("user_privilege not like", value, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeIn(List<String> values) {
            addCriterion("user_privilege in", values, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeNotIn(List<String> values) {
            addCriterion("user_privilege not in", values, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeBetween(String value1, String value2) {
            addCriterion("user_privilege between", value1, value2, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andUserPrivilegeNotBetween(String value1, String value2) {
            addCriterion("user_privilege not between", value1, value2, "userPrivilege");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeIsNull() {
            addCriterion("card_enroll_time is null");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeIsNotNull() {
            addCriterion("card_enroll_time is not null");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeEqualTo(Date value) {
            addCriterion("card_enroll_time =", value, "cardEnrollTime");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeNotEqualTo(Date value) {
            addCriterion("card_enroll_time <>", value, "cardEnrollTime");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeGreaterThan(Date value) {
            addCriterion("card_enroll_time >", value, "cardEnrollTime");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("card_enroll_time >=", value, "cardEnrollTime");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeLessThan(Date value) {
            addCriterion("card_enroll_time <", value, "cardEnrollTime");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeLessThanOrEqualTo(Date value) {
            addCriterion("card_enroll_time <=", value, "cardEnrollTime");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeIn(List<Date> values) {
            addCriterion("card_enroll_time in", values, "cardEnrollTime");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeNotIn(List<Date> values) {
            addCriterion("card_enroll_time not in", values, "cardEnrollTime");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeBetween(Date value1, Date value2) {
            addCriterion("card_enroll_time between", value1, value2, "cardEnrollTime");
            return (Criteria) this;
        }

        public Criteria andCardEnrollTimeNotBetween(Date value1, Date value2) {
            addCriterion("card_enroll_time not between", value1, value2, "cardEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeIsNull() {
            addCriterion("face_enroll_time is null");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeIsNotNull() {
            addCriterion("face_enroll_time is not null");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeEqualTo(Date value) {
            addCriterion("face_enroll_time =", value, "faceEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeNotEqualTo(Date value) {
            addCriterion("face_enroll_time <>", value, "faceEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeGreaterThan(Date value) {
            addCriterion("face_enroll_time >", value, "faceEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("face_enroll_time >=", value, "faceEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeLessThan(Date value) {
            addCriterion("face_enroll_time <", value, "faceEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeLessThanOrEqualTo(Date value) {
            addCriterion("face_enroll_time <=", value, "faceEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeIn(List<Date> values) {
            addCriterion("face_enroll_time in", values, "faceEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeNotIn(List<Date> values) {
            addCriterion("face_enroll_time not in", values, "faceEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeBetween(Date value1, Date value2) {
            addCriterion("face_enroll_time between", value1, value2, "faceEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFaceEnrollTimeNotBetween(Date value1, Date value2) {
            addCriterion("face_enroll_time not between", value1, value2, "faceEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeIsNull() {
            addCriterion("fp_enroll_time is null");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeIsNotNull() {
            addCriterion("fp_enroll_time is not null");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeEqualTo(Date value) {
            addCriterion("fp_enroll_time =", value, "fpEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeNotEqualTo(Date value) {
            addCriterion("fp_enroll_time <>", value, "fpEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeGreaterThan(Date value) {
            addCriterion("fp_enroll_time >", value, "fpEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("fp_enroll_time >=", value, "fpEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeLessThan(Date value) {
            addCriterion("fp_enroll_time <", value, "fpEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeLessThanOrEqualTo(Date value) {
            addCriterion("fp_enroll_time <=", value, "fpEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeIn(List<Date> values) {
            addCriterion("fp_enroll_time in", values, "fpEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeNotIn(List<Date> values) {
            addCriterion("fp_enroll_time not in", values, "fpEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeBetween(Date value1, Date value2) {
            addCriterion("fp_enroll_time between", value1, value2, "fpEnrollTime");
            return (Criteria) this;
        }

        public Criteria andFpEnrollTimeNotBetween(Date value1, Date value2) {
            addCriterion("fp_enroll_time not between", value1, value2, "fpEnrollTime");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeIsNull() {
            addCriterion("password_enroll_time is null");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeIsNotNull() {
            addCriterion("password_enroll_time is not null");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeEqualTo(Date value) {
            addCriterion("password_enroll_time =", value, "passwordEnrollTime");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeNotEqualTo(Date value) {
            addCriterion("password_enroll_time <>", value, "passwordEnrollTime");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeGreaterThan(Date value) {
            addCriterion("password_enroll_time >", value, "passwordEnrollTime");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("password_enroll_time >=", value, "passwordEnrollTime");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeLessThan(Date value) {
            addCriterion("password_enroll_time <", value, "passwordEnrollTime");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeLessThanOrEqualTo(Date value) {
            addCriterion("password_enroll_time <=", value, "passwordEnrollTime");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeIn(List<Date> values) {
            addCriterion("password_enroll_time in", values, "passwordEnrollTime");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeNotIn(List<Date> values) {
            addCriterion("password_enroll_time not in", values, "passwordEnrollTime");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeBetween(Date value1, Date value2) {
            addCriterion("password_enroll_time between", value1, value2, "passwordEnrollTime");
            return (Criteria) this;
        }

        public Criteria andPasswordEnrollTimeNotBetween(Date value1, Date value2) {
            addCriterion("password_enroll_time not between", value1, value2, "passwordEnrollTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNull() {
            addCriterion("update_time is null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNotNull() {
            addCriterion("update_time is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeEqualTo(Date value) {
            addCriterion("update_time =", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotEqualTo(Date value) {
            addCriterion("update_time <>", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThan(Date value) {
            addCriterion("update_time >", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("update_time >=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThan(Date value) {
            addCriterion("update_time <", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThanOrEqualTo(Date value) {
            addCriterion("update_time <=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIn(List<Date> values) {
            addCriterion("update_time in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotIn(List<Date> values) {
            addCriterion("update_time not in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeBetween(Date value1, Date value2) {
            addCriterion("update_time between", value1, value2, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotBetween(Date value1, Date value2) {
            addCriterion("update_time not between", value1, value2, "updateTime");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}