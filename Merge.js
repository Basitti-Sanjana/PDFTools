import PDFMerger from 'pdf-merger-js';
var merger = new PDFMerger();
export const mergePdfs = async (p1,p2) => {
  try{
    await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
    await merger.add(p2); // merge only page 2
    // Set metadata
    await merger.setMetadata({
      producer: "pdf-merger-js based script",
      author: "John Doe",
      creator: "John Doe",
      title: "PDF Merger"
    });
    
    const d = new Date().getTime();
    await merger.save(`public/${d}.pdf`);
    return d;
  }
  catch (error) {
    // Handle errors during the merging process
    console.error(error);
    throw error;
  }
  
}
  
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);




