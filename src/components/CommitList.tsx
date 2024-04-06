import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommitList: React.FC<{username:string, repository: string}> = ({ username, repository }) => {
  const [commits, setCommits] = useState<any[]>([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${repository}/commits`);
        setCommits(response.data);
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    fetchCommits();
  }, [username, repository]);

  return (
    <div>
      <h2 className="bg-blue-500 text-white p-4">Git Commit History</h2>
      {commits.length > 0 && (
  <ul className='ml-2 mt-2 list-inside list-disc'>
    {commits.map((commit: any) => (
      <li key={commit?.sha}>
        {commit?.sha?.slice(0, 6)} <strong>{commit?.commit?.author?.name}:</strong> {commit?.commit?.message}
      </li>
    ))}
  </ul>
)}
    </div>
  );
};

export default CommitList;
