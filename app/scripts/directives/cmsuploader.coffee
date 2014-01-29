'use strict'
angular.module('angularCmsApp').directive "cmsUploader", ->
	  scope:
	    id: "@"
	    title: "@"
	    image: "@"
	    collection: "@"
	    maxwidth: "@"
	    maxheight: "@"
	    sizelimit: "@"
	    filelimit: "@"
	    aspectratio: "@"
	    name: "@"
	    btncrop: "@"
	    btnupload: "@"
	    action: "@"
	    multiple: "@"
	    cropper: "@"
	    dragdrop: "@"
	    litmpl: "@"
	    showtable: "@"
	    showlist: "@"
	    handles: "@"
	    uploader: "@"
	  template: '''
	      <div id="uploader">
	        <div id="uploader-dropzone" class="uploader-dropzone">
	          <h4>Drop files here</h4>
	          <p>
	            <span>or</span>
	          </p>
	          <button id="uploader-btn" class="btn btn-default">Select files</button>
	          <input id="uploader-file-input" type="file" name="{{name}}" multiple="{{multiple}}" />
	        </div>
	        <legend>Que</legend>
	        <span id="uploader-count"></span>
	         <legend>List</legend>
	        <div id="imgPanel"></div>

	        <div id="fileAttributes"></div>

	        <div id="uploader-wrap"></div>
	         <legend>Table</legend>
	        <table id="uploader-table" class="table table-bordered"></table>

	        <ul class="list-unstyled uploader-files-list">
	          <li class="media">
	            <a class="pull-left" href="#">
	              <img class="media-object img-thumbnail" src="http://placehold.it/75" />
	            </a>
	            <div class="media-body">
	              <h5 class="media-heading">File being uploaded...</h5>
	              <p>
	                <small>
	                Type: image/png 
	                Size: 45kb 
	                Modified: date</small>
	              </p>
	              <div class="progress">
	                <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
	                  <span class="sr-only">60% Complete</span>
	                </div>
	              </div>
	            </div>
	          </li>
	        </ul>
	      </div>
	  '''
	  restrict: "E"
	  replace: true
	  transclude: false
	  link: postLink = (scope, element, attrs) ->

	    targetId = 'uploader-dropzone'
	    inputId = 'uploader-file-input'
	    buttonId = 'uploader-btn'

	    #Internal variables
	    _uploader = 
	      files: []
	      button: angular.element("##{buttonId}")
	      input: angular.element("##{inputId}")
	      dropzone: angular.element("##{targetId}")





	    _uploader.button.bind( 'click', () ->
	     _uploader.input.trigger('click') 
	    )

	    console.log( scope )


	    init = (id) ->



	      #Hide element
	      _uploader.input.hide()

	      #Listen for button and trigger change

	      dropZone = document.getElementById(targetId)
	      dropZone.addEventListener "dragout", handleDragOut, false
	      dropZone.addEventListener "dragover", handleDragOver, false
	      dropZone.addEventListener "drop", handleFileDrop, false

	      uploader = document.getElementById(inputId)
	      uploader.addEventListener "change", ((e) ->
	        files = e.currentTarget.files
	        handleFiles files
	      ), false

	    handleFileDrop = (evt) ->
	      evt.stopPropagation()
	      evt.preventDefault()
	      files = evt.dataTransfer.files
	      displayFiles files
	      handleFiles files

	    handleDragOver = (evt) ->
	      evt.stopPropagation()
	      evt.preventDefault()
	      console.log 'dragover'

	    handleDragOut = (evt) ->
	      evt.stopPropagation()
	      evt.preventDefault()
	      console.log 'dragout'

	    displayFiles = (files) ->
	      clearTable()
	      fileCount = document.getElementById("uploader-count")
	      fileCount.innerHTML = files.length + " File(s) Selected"
	      fileTable = document.getElementById("uploader-table")
	      if files.length > 0
	        row = undefined
	        cell = undefined
	        textNode = undefined
	        i = 0

	        while i < files.length
	          addThumbnail files[i]
	          row = fileTable.insertRow(i)
	          cell = row.insertCell(0)
	          textNode = document.createTextNode(files[i].name)
	          cell.appendChild textNode
	          cell = row.insertCell(1)
	          textNode = document.createTextNode(files[i].type)
	          cell.appendChild textNode
	          cell = row.insertCell(2)
	          textNode = document.createTextNode((files[i].size / 1024).toFixed(2) + "KB")
	          cell.appendChild textNode
	          if files[i].lastModifiedDate isnt undefined
	            cell = row.insertCell(3)
	            textNode = document.createTextNode(files[i].lastModifiedDate)
	            cell.appendChild textNode
	          i++
	        fileTable.style.visibility = "visible"
	      else
	        fileTable.style.visibility = "hidden"

	    clearTable = ->
	      fileTable = document.getElementById("uploader-table")
	      fileTable.deleteRow fileTable.rows.length - 1  while fileTable.rows.length > 0

	    handleFiles = (files) ->
	      fileLimit = scope.filelimit
	      sizeLimit = scope.sizelimit
	      imageType = /image.*/
	      imgPanel = document.getElementById("imgPanel")
	      imgPanel.innerHTML = ""
	      sizeLimitBytes = sizeLimit * 1024
	      if files.length < fileLimit
	        i = 0

	        while i < files.length
	          file = files[i]
	          if file.type.match(imageType)
	            if file.size < sizeLimitBytes

	              #Add to files
	              #scope.uploader.files.push(file)

	              img = document.createElement("img")
	              img.file = file
	              img.id = file.name
	              img.name = file.name
	              img.alt = file.name
	              img.className = "unhighlight"
	              img.addEventListener "mouseover", showFile, false
	              img.addEventListener "mouseout", clearFile, false
	              imgPanel.appendChild img


	              reader = new FileReader()
	              reader.onload = ((aImg) ->
	                (e) ->
	                  aImg.src = e.target.result
	              )(img)
	              reader.readAsDataURL file
	            else
	              alert file.name + " is larger than " + sizeLimit + "KB."
	          else
	            alert file.name + " is not an image."
	          i++
	      else
	        imgPanel.innerHTML = "Only " + fileLimit + " files can be selected at a time."

	    #Handle displaying file info in a popover
	    showFile = (el)->
	      console.log @

	      #Build the info
	      file = @file
	      fileinfo = ""
	      fileinfo += file.type + "<br>"
	      fileinfo += (file.size / 1024).toFixed(2) + "KB<br>"
	      fileinfo += file.lastModifiedDate + "<br>"
	      fileAttributes = document.getElementById("fileAttributes")
	      fileAttributes.innerHTML = fileinfo


	      options = 
	        html: true
	        selector: ".#{file.name}"
	        title: 'File info'
	        content: fileinfo
	        placement: 'top'

	      @className = "highlight " + file.name

	      #create popover  
	      #filePopover = angular.element("#fileAttributes").popover(options)

	      #open popover
	      #filePopover.popover('show')



	    clearFile = ->
	      #create popover  
	      #filePopover = angular.element('#fileAttributes').popover()

	      #open popover
	      #filePopover.popover('hide')

	      fileAttributes = document.getElementById("fileAttributes")
	      fileAttributes.innerHTML = ""


	      @className = "unhighlight"

	    handleRead = (theFile) ->
	      (e) ->
	        span = document.createElement("span")
	        span.innerHTML = ["<img class=\"uploader-thumb\" src=\"", e.target.result, "\" title=\"", escape(theFile.name), "\"/>"].join("")
	        $("#uploader-wrap").html span

	    addThumbnail = (file) ->
	      elm = "#uploader-thumbnails"
	      tmpl = angular.element(scope.litmpl).html()
	      angular.element(elm).append tmpl

	    init(targetId)
	    console.log "Linking function", element, attrs

