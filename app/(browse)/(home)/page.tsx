// export default function Page() {
//   return (
//     <div className="flex flex-col gap-y-4">
//       <h1>Home</h1>
//     </div>
//   );
// }

import { Suspense } from "react";

import { Results, ResultsSkeleton } from "./_components/results";

export default function Page() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
