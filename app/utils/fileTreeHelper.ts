
export const buildFileTree = (files) => {
    const fileTree = {};
  
    Object.keys(files).forEach((filePath) => {
      const parts = filePath.split('\\'); // or '/' for Unix-based paths
      let currentLevel = fileTree;
  
      parts.forEach((part, idx) => {
        if (!currentLevel[part]) {
          currentLevel[part] = idx === parts.length - 1 ? filePath : {};
        }
        currentLevel = currentLevel[part];
      });
    });
  
    return fileTree;
  };
  