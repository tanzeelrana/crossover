import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';

const CommitList: React.FC<{ username: string, repository: string }> = ({ username, repository }) => {
  const [commits, setCommits] = useState<any[]>([]);

  const columns = [
    { header: '#', accessor: 'sha', accessor2:'' },
    { header: 'Commit Message', accessor: 'commit.message', accessor2:'' },
    { header: 'Author', accessor: 'author.login', accessor2: 'author.avatar_url' },
  ];

  const fetchCommits = async () => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${username}/${repository}/commits`);
      console.log(response.data);
      setCommits(response.data);
    } catch (error) {
      console.error('Error fetching commits:', error);
    }
  };

  useEffect(() => {
    if(commits.length < 1){
      fetchCommits();
    }else{
      setInterval(()=>{
        fetchCommits();
      },5000)
    }
  }, []);

  return (
    <div>
      <h2 className="bg-gradient-to-r from-red-500 to-cyan-500  text-center text-white p-4">Git Commit History</h2>
      <Table data={commits} columns={columns} />
    </div>
  );
};

export default CommitList;
