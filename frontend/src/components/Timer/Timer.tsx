// import React, { useState, useEffect } from "react";
// import moment from "moment";

// type TimerProps = {
//   endDate: moment.Moment;
//   fromDate?: moment.Moment;
// };

// const MyComponent: React.FC<TimerProps> = ({
//   endDate,
//   fromDate,
// }: TimerProps) => {
//   const [timeLeft, setTimeLeft] = useState(endDate);

//     const getBgColorClass = (second: number) => {
//         const colorClass = {
//             txtColor: '',
//             bgColor: ''
//         };

//         if (second <= 3600) {
//             colorClass.bgColor = 'bg-yellow-500';
//             colorClass.txtColor = 'text-yellow-800';
//         }

//         if (second <= 600) {
//             colorClass.bgColor = 'bg-amber-500';
//             colorClass.txtColor = 'text-amber-800';
//         }

//         if (second <= 300) {
//             colorClass.bgColor = 'bg-orange-500';
//             colorClass.txtColor = 'text-orange-800';
//         }

//         if (second <= 60) {
//             colorClass.bgColor = 'bg-rose-500';
//             colorClass.txtColor = 'text-rose-800';
//         }
//         return colorClass;
        
//     }


//   // Use the useEffect hook to set up the timer
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft((timeLeft) => {
//             return timeLeft.subtract(1, "seconds")
//         });
//     }, 1000);

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, []);
  


//   return (
//     <div>
//       {fromDate ? (
//         <>
//         <div className="flex-none rounded-full bg-emerald-500/20 p-1">
//             <div className={`h-1.5 w-1.5 rounded-full bg-emerald-500`} />
//         </div>
//         <p>
//           Time left: {fromDate.from(timeLeft)}
//         </p>
//         </>
//       ) : (
//         <>
//         <div className="flex-none rounded-full bg-emerald-500/20 p-1">
//             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
//         </div>
//         <p>
//           Time left: {moment().from(timeLeft)}
//         </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default MyComponent;
