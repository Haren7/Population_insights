import React, { useState, useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { createTree } from '../utils/data';

function generateTree(tree, root, focus) {
  return (
    <TreeNode key={tree[root].ID} label={ <div className={(focus === tree[root].ID ? 'nodeInFocus' : '')}> {tree[root].Name} </div> }>
        {
          tree[root].children.map(child => generateTree(tree, child, focus))
        }
    </TreeNode>
  );
}

export const StyledTree = (props) => {
  const [loading, setLoading] = useState(true);
  const [tree, setTree] = useState();
  const [root, setRoot] = useState();

  useEffect(() => {
    const loadData = async () => {
          setLoading(true);
          const rawData = await createTree();
          setTree(rawData.tree);
          setRoot(rawData.root);
          setLoading(false);
    }
    loadData();
  }, []);    
  
  return (
      <>
        {
          loading ? (<h4>Loading...</h4>) : 
          (<Tree lineWidth={'2px'} lineColor={'green'} lineBorderRadius={'10px'} label={<div>Origin</div>}>
            {generateTree(tree, root, props.focus)}
          </Tree>)
        }
      </>
    );
  }

