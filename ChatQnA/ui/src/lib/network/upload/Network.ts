// Copyright (c) 2024 Intel Corporation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { env } from "$env/dynamic/public";

const DOC_BASE_URL = env.DOC_BASE_URL;

export async function fetchKnowledgeBaseId(file: Blob, fileName: string) {
	const url = `${DOC_BASE_URL}/create`;
	const formData = new FormData();
	formData.append("file", file, fileName);
	const init: RequestInit = {
		method: "POST",
		body: formData,
	};

	try {
		const response = await fetch(url, init);
		if (!response.ok) throw response.status;
		return await response.json();
	} catch (error) {
		console.error("network error: ", error);
		return undefined;
	}
}

export async function fetchKnowledgeBaseIdByPaste(pasteUrlList: any, urlType: string | undefined) {
	const url = `${DOC_BASE_URL}/upload_link`;
	const data = {
		link_list: pasteUrlList,
	};
	const init: RequestInit = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};

	try {
		const response = await fetch(url, init);
		if (!response.ok) throw response.status;
		return await response.json();
	} catch (error) {
		console.error("network error: ", error);
		return undefined;
	}
}
