package com.fengbiaoedu.bean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LabClockInRecordExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public LabClockInRecordExample() {
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

        public Criteria andClockinIdIsNull() {
            addCriterion("clockin_id is null");
            return (Criteria) this;
        }

        public Criteria andClockinIdIsNotNull() {
            addCriterion("clockin_id is not null");
            return (Criteria) this;
        }

        public Criteria andClockinIdEqualTo(String value) {
            addCriterion("clockin_id =", value, "clockinId");
            return (Criteria) this;
        }

        public Criteria andClockinIdNotEqualTo(String value) {
            addCriterion("clockin_id <>", value, "clockinId");
            return (Criteria) this;
        }

        public Criteria andClockinIdGreaterThan(String value) {
            addCriterion("clockin_id >", value, "clockinId");
            return (Criteria) this;
        }

        public Criteria andClockinIdGreaterThanOrEqualTo(String value) {
            addCriterion("clockin_id >=", value, "clockinId");
            return (Criteria) this;
        }

        public Criteria andClockinIdLessThan(String value) {
            addCriterion("clockin_id <", value, "clockinId");
            return (Criteria) this;
        }

        public Criteria andClockinIdLessThanOrEqualTo(String value) {
            addCriterion("clockin_id <=", value, "clockinId");
            return (Criteria) this;
        }

        public Criteria andClockinIdLike(String value) {
            addCriterion("clockin_id like", value, "clockinId");
            return (Criteria) this;
        }

        public Criteria andClockinIdNotLike(String value) {
            addCriterion("clockin_id not like", value, "clockinId");
            return (Criteria) this;
        }

        public Criteria andClockinIdIn(List<String> values) {
            addCriterion("clockin_id in", values, "clockinId");
            return (Criteria) this;
        }

        public Criteria andClockinIdNotIn(List<String> values) {
            addCriterion("clockin_id not in", values, "clockinId");
            return (Criteria) this;
        }

        public Criteria andClockinIdBetween(String value1, String value2) {
            addCriterion("clockin_id between", value1, value2, "clockinId");
            return (Criteria) this;
        }

        public Criteria andClockinIdNotBetween(String value1, String value2) {
            addCriterion("clockin_id not between", value1, value2, "clockinId");
            return (Criteria) this;
        }

        public Criteria andEnrollIdIsNull() {
            addCriterion("enroll_id is null");
            return (Criteria) this;
        }

        public Criteria andEnrollIdIsNotNull() {
            addCriterion("enroll_id is not null");
            return (Criteria) this;
        }

        public Criteria andEnrollIdEqualTo(Long value) {
            addCriterion("enroll_id =", value, "enrollId");
            return (Criteria) this;
        }

        public Criteria andEnrollIdNotEqualTo(Long value) {
            addCriterion("enroll_id <>", value, "enrollId");
            return (Criteria) this;
        }

        public Criteria andEnrollIdGreaterThan(Long value) {
            addCriterion("enroll_id >", value, "enrollId");
            return (Criteria) this;
        }

        public Criteria andEnrollIdGreaterThanOrEqualTo(Long value) {
            addCriterion("enroll_id >=", value, "enrollId");
            return (Criteria) this;
        }

        public Criteria andEnrollIdLessThan(Long value) {
            addCriterion("enroll_id <", value, "enrollId");
            return (Criteria) this;
        }

        public Criteria andEnrollIdLessThanOrEqualTo(Long value) {
            addCriterion("enroll_id <=", value, "enrollId");
            return (Criteria) this;
        }

        public Criteria andEnrollIdIn(List<Long> values) {
            addCriterion("enroll_id in", values, "enrollId");
            return (Criteria) this;
        }

        public Criteria andEnrollIdNotIn(List<Long> values) {
            addCriterion("enroll_id not in", values, "enrollId");
            return (Criteria) this;
        }

        public Criteria andEnrollIdBetween(Long value1, Long value2) {
            addCriterion("enroll_id between", value1, value2, "enrollId");
            return (Criteria) this;
        }

        public Criteria andEnrollIdNotBetween(Long value1, Long value2) {
            addCriterion("enroll_id not between", value1, value2, "enrollId");
            return (Criteria) this;
        }

        public Criteria andUserNameIsNull() {
            addCriterion("user_name is null");
            return (Criteria) this;
        }

        public Criteria andUserNameIsNotNull() {
            addCriterion("user_name is not null");
            return (Criteria) this;
        }

        public Criteria andUserNameEqualTo(String value) {
            addCriterion("user_name =", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotEqualTo(String value) {
            addCriterion("user_name <>", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameGreaterThan(String value) {
            addCriterion("user_name >", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameGreaterThanOrEqualTo(String value) {
            addCriterion("user_name >=", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLessThan(String value) {
            addCriterion("user_name <", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLessThanOrEqualTo(String value) {
            addCriterion("user_name <=", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLike(String value) {
            addCriterion("user_name like", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotLike(String value) {
            addCriterion("user_name not like", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameIn(List<String> values) {
            addCriterion("user_name in", values, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotIn(List<String> values) {
            addCriterion("user_name not in", values, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameBetween(String value1, String value2) {
            addCriterion("user_name between", value1, value2, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotBetween(String value1, String value2) {
            addCriterion("user_name not between", value1, value2, "userName");
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

        public Criteria andClockingTimeIsNull() {
            addCriterion("clocking_time is null");
            return (Criteria) this;
        }

        public Criteria andClockingTimeIsNotNull() {
            addCriterion("clocking_time is not null");
            return (Criteria) this;
        }

        public Criteria andClockingTimeEqualTo(Date value) {
            addCriterion("clocking_time =", value, "clockingTime");
            return (Criteria) this;
        }

        public Criteria andClockingTimeNotEqualTo(Date value) {
            addCriterion("clocking_time <>", value, "clockingTime");
            return (Criteria) this;
        }

        public Criteria andClockingTimeGreaterThan(Date value) {
            addCriterion("clocking_time >", value, "clockingTime");
            return (Criteria) this;
        }

        public Criteria andClockingTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("clocking_time >=", value, "clockingTime");
            return (Criteria) this;
        }

        public Criteria andClockingTimeLessThan(Date value) {
            addCriterion("clocking_time <", value, "clockingTime");
            return (Criteria) this;
        }

        public Criteria andClockingTimeLessThanOrEqualTo(Date value) {
            addCriterion("clocking_time <=", value, "clockingTime");
            return (Criteria) this;
        }

        public Criteria andClockingTimeIn(List<Date> values) {
            addCriterion("clocking_time in", values, "clockingTime");
            return (Criteria) this;
        }

        public Criteria andClockingTimeNotIn(List<Date> values) {
            addCriterion("clocking_time not in", values, "clockingTime");
            return (Criteria) this;
        }

        public Criteria andClockingTimeBetween(Date value1, Date value2) {
            addCriterion("clocking_time between", value1, value2, "clockingTime");
            return (Criteria) this;
        }

        public Criteria andClockingTimeNotBetween(Date value1, Date value2) {
            addCriterion("clocking_time not between", value1, value2, "clockingTime");
            return (Criteria) this;
        }

        public Criteria andVerifyModeIsNull() {
            addCriterion("verify_mode is null");
            return (Criteria) this;
        }

        public Criteria andVerifyModeIsNotNull() {
            addCriterion("verify_mode is not null");
            return (Criteria) this;
        }

        public Criteria andVerifyModeEqualTo(Byte value) {
            addCriterion("verify_mode =", value, "verifyMode");
            return (Criteria) this;
        }

        public Criteria andVerifyModeNotEqualTo(Byte value) {
            addCriterion("verify_mode <>", value, "verifyMode");
            return (Criteria) this;
        }

        public Criteria andVerifyModeGreaterThan(Byte value) {
            addCriterion("verify_mode >", value, "verifyMode");
            return (Criteria) this;
        }

        public Criteria andVerifyModeGreaterThanOrEqualTo(Byte value) {
            addCriterion("verify_mode >=", value, "verifyMode");
            return (Criteria) this;
        }

        public Criteria andVerifyModeLessThan(Byte value) {
            addCriterion("verify_mode <", value, "verifyMode");
            return (Criteria) this;
        }

        public Criteria andVerifyModeLessThanOrEqualTo(Byte value) {
            addCriterion("verify_mode <=", value, "verifyMode");
            return (Criteria) this;
        }

        public Criteria andVerifyModeIn(List<Byte> values) {
            addCriterion("verify_mode in", values, "verifyMode");
            return (Criteria) this;
        }

        public Criteria andVerifyModeNotIn(List<Byte> values) {
            addCriterion("verify_mode not in", values, "verifyMode");
            return (Criteria) this;
        }

        public Criteria andVerifyModeBetween(Byte value1, Byte value2) {
            addCriterion("verify_mode between", value1, value2, "verifyMode");
            return (Criteria) this;
        }

        public Criteria andVerifyModeNotBetween(Byte value1, Byte value2) {
            addCriterion("verify_mode not between", value1, value2, "verifyMode");
            return (Criteria) this;
        }

        public Criteria andClockinModeIsNull() {
            addCriterion("clockin_mode is null");
            return (Criteria) this;
        }

        public Criteria andClockinModeIsNotNull() {
            addCriterion("clockin_mode is not null");
            return (Criteria) this;
        }

        public Criteria andClockinModeEqualTo(Byte value) {
            addCriterion("clockin_mode =", value, "clockinMode");
            return (Criteria) this;
        }

        public Criteria andClockinModeNotEqualTo(Byte value) {
            addCriterion("clockin_mode <>", value, "clockinMode");
            return (Criteria) this;
        }

        public Criteria andClockinModeGreaterThan(Byte value) {
            addCriterion("clockin_mode >", value, "clockinMode");
            return (Criteria) this;
        }

        public Criteria andClockinModeGreaterThanOrEqualTo(Byte value) {
            addCriterion("clockin_mode >=", value, "clockinMode");
            return (Criteria) this;
        }

        public Criteria andClockinModeLessThan(Byte value) {
            addCriterion("clockin_mode <", value, "clockinMode");
            return (Criteria) this;
        }

        public Criteria andClockinModeLessThanOrEqualTo(Byte value) {
            addCriterion("clockin_mode <=", value, "clockinMode");
            return (Criteria) this;
        }

        public Criteria andClockinModeIn(List<Byte> values) {
            addCriterion("clockin_mode in", values, "clockinMode");
            return (Criteria) this;
        }

        public Criteria andClockinModeNotIn(List<Byte> values) {
            addCriterion("clockin_mode not in", values, "clockinMode");
            return (Criteria) this;
        }

        public Criteria andClockinModeBetween(Byte value1, Byte value2) {
            addCriterion("clockin_mode between", value1, value2, "clockinMode");
            return (Criteria) this;
        }

        public Criteria andClockinModeNotBetween(Byte value1, Byte value2) {
            addCriterion("clockin_mode not between", value1, value2, "clockinMode");
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