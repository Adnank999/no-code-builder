import React from 'react';
import { buildFileTree } from '../utils/fileTreeHelper';
interface Props{
  files: { [key: string]: string };
  onFileClick : (filePath: string) => void;
}

const DirectoryView = ({ files, onFileClick }:Props) => {
    const fileTree = buildFileTree(files);
  
    const renderTree = (node:any, level = 0) => {
      return Object.keys(node).map((key) => {
        const isFile = typeof node[key] === 'string';
        return (
          <div key={key} style={{ paddingLeft: `${level * 20}px` }}>
            {isFile ? (
              <div
                onClick={() => onFileClick(node[key])}
                className="cursor-pointer text-blue-500"
              >
                {key}
              </div>
            ) : (
              <div>
                <strong>{key}</strong>
                <div>{renderTree(node[key], level + 1)}</div>
              </div>
            )}
          </div>
        );
      });
    };
  
    return <div>{renderTree(fileTree)}</div>;
  };

export default DirectoryView;
