// // import { useProtectedMutation } from "../services/authApi";

// //** We need to close our backend router with a protected route  */
// import React from "react";
// import { Button } from "react-bootstrap";

// export default function ProtectedComponent() {
//   // const [attemptAccess, { data, error, isLoading }] = useProtectedMutation();

//   return (
//     <div className="container">
//       <div className="text-center bg-black text-light">
//         {/* <Button onClick={() => attemptAccess()} isLoading={isLoading}>
//           Make an authenticated request
//         </Button> */}
//         <div>
//           {data ? (
//             <>
//               Data:
//               <pre>{JSON.stringify(data, null, 2)}</pre>
//             </>
//           ) : error ? (
//             <>
//               Error: <pre>{JSON.stringify(error, null, 2)}</pre>
//             </>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }
