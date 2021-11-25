import React from "react";
import "../css/UploadForm.css";

function UploadForm() {
  return (
    <div>
      <div th:if="${message}">
        <h2 th:text="${message}" />
      </div>

      <div>
        <div id="file_loader" class="file_loader">
          <i class="fas fa-upload"></i>
          <span>Drag files</span>
        </div>
        <input type="button" value="try!" id="test" />
      </div>

      <div>
        <ul>
          <li th:each="file : ${files}">
            <a th:href="${file}" th:text="${file}" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export { UploadForm };
