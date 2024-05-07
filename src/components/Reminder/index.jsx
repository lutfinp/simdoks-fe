import Announc from "./Announc";

const Reminder = ({ total, date }) => {
  return (
    <>
      <Announc total={total} date={date} />
    </>
  );
};

export default Reminder;
