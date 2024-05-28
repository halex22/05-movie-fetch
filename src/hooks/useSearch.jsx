import { useEffect, useRef, useState } from "react";


function validationSearch(search) {
	if (search === '') return "A value must be entered";
	if (search.match(/^\d+$/)) return "Only digits search can not be executed";
	if (search.length < 3)  return 'At least 3 chars must be given';
	return null;
}

export default function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstSearch = useRef(true);


  useEffect(() => {
    if (isFirstSearch.current) {
      isFirstSearch.current = search === "";
			if ( search === "") return;
    }
		const validationError = validationSearch(search);
		setError(validationError)

  }, [search]);

  return { search, updateSearch, error };
}
