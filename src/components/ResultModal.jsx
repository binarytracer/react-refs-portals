import { forwardRef, useImperativeHandle, useRef } from "react";

// react v19
// export default function ResultModal(props) {
//   const { targetTime, result, ref } = props;

//   return (
//     <dialog className="result-modal" ref={ref}>
//       <h2>Your {result}</h2>
//       <p>
//         Target time was <strong>{targetTime} seconds.</strong>
//       </p>
//       <p>
//         You stopped the timer with <strong> X seconds left.</strong>
//       </p>
//       <form method="dialog">
//         <button> Close </button>
//       </form>
//     </dialog>
//   );
// }

const ResultModal = forwardRef(function (props, ref) {
  const { targetTime, remainingTime, handleReset } = props;

  const dialogRef = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = (1 * 1000 - remainingTime / targetTime) / 10;

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current.showModal();
    },
  }));

  return (
    <dialog className="result-modal" ref={dialogRef}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>You Score: {score}</h2>}
      <p>
        Target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong> {formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={handleReset}>
        <button> Close </button>
      </form>
    </dialog>
  );
});

export default ResultModal;
