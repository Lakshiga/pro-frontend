// import React, { useRef } from 'react';
// import html2canvas from 'html2canvas';

// const DrawComponent = ({ draw }) => {
//   const drawRef = useRef();

//   const handleDownload = async () => {
//     const canvas = await html2canvas(drawRef.current);
//     const dataURL = canvas.toDataURL('image/png');
//     const link = document.createElement('a');
//     link.href = dataURL;
//     link.download = 'match_draw.png';
//     link.click();
//   };

//   return (
//     <div>
//       <h5>Match Draw</h5>
//       <div ref={drawRef} style={{ padding: '20px', border: '1px solid #ccc' }}>
//         {draw.map((match, index) => (
//           <div key={index}>
//             {match.player1} vs {match.player2}
//           </div>
//         ))}
//       </div>
//       <button onClick={handleDownload} className="btn" style={{ backgroundColor: 'navy', color: 'white', marginTop: '10px' }}>
//         Download Match Draw
//       </button>
//     </div>
//   );
// };

// export default DrawComponent;
