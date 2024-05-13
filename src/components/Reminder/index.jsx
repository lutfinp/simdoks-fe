import Announc from "./Announc";

const Reminder = ({
  data,
  totalPageReminder,
  pageReminder,
  setPageReminder
}) => {
  return (
    <>
      <Announc
        data={data}
        totalPageReminder={totalPageReminder}
        pageReminder={pageReminder}
        setPageReminder={setPageReminder}
      />
    </>
  );
};

export default Reminder;
