$(document).ready(function () {
    const uri = "api/Posts";
    let posts = [];

    RefreshPostsList();

    function RefreshPostsList() {
        fetch(uri)
            .then(res => res.json())
            .then(data => ListPosts(data))
            .catch(error => console.log(error));
    }

    function ListPosts(data) {
        var tBody = $("#tBodyPosts");
        tBody.html('');

        data.forEach(item => {
            $("#tBodyPosts").append(
                "<tr>" +                
                "<td class='id'>" + item.id + "</td>" +
                "<td>" + item.title + "</td>" +
                "<td>" + item.author + "</td>" +
                "<td class='justify-content-center'>" + "<button type='button' id='btnOpen' class='btn btn-success btn-sm'>" + "Open" + "</button>" + "</td>" +
                "<td class='justify-content-center'>" + "<button type='button' id='btnEdit' class='btn btn-info btn-sm'>" + "Edit" + "</button>" + "</td>" +
                "<td class='justify-content-center'>" + "<button type='button' id='btnDelete' class='btn btn-danger btn-sm'>" + "Delete" + "</button>" + "</td>" +
                "</tr>");
        });

        posts = data;

        if (posts.length === 0) {
            $('#lblMessage').text(`Currently there are no posts, please create one`);
            $('#lblMessage').show();
        }
        else {
            $('#lblMessage').text('');
            $('#lblMessage').hide();
        }
    }

    $("#btnGoCreate").click(function () {
        window.location = "Create.html";
    })

    $("#btnSave").click(function () {
        var postId = parseInt($("#txtPostId").val());

        fetch(`${uri}/${postId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: postId,
                Title: $("#txtTitle").val(),
                Text: $("#txtText").val(),
                IsPrivate: $("#checkIsPrivate").is(":checked") ? true : false,
                Author: $("#txtAuthor").val()
            })
        })
        .then(() => RefreshPostsList())
        .catch(error => console.error('Unable to update item.', error))

        CloseInput();

        return false;
    })

    function CloseInput() {
        $("#editPostForm").trigger("reset")
        $("#editPostContainer").toggle();
    }

    $("#bntCancel").click(function () {
        CloseInput();
    })

    $(document).on('click', '#btnOpen', function () {
        var valor = parseInt($(this).closest("tr").find('.id').text());
        var item = posts.find(item => item.id === valor)

        $("#txtModalTitle").text(item.title);
        $("#txtModalText").val(item.text);
        $("#txtModalAuthor").text(item.author);

        $('#myModal').modal('toggle')
    })

    $(document).on('click', '#btnEdit', function () {
        var valor = parseInt($(this).closest("tr").find('.id').text());

        var item = posts.find(item => item.id === valor)

        $("#txtPostId").val(item.id);
        $("#txtTitle").val(item.title);
        $("#txtText").val(item.text);
        $("#txtAuthor").val(item.author);
        $("#checkIsPrivate").prop("checked", item.isPrivate);
        $("#editPostContainer").toggle();
    })

    $(document).on('click', '#btnDelete', function () {
        var valor = parseInt($(this).closest("tr").find('.id').text());

        fetch(`${uri}/${valor}`, {
            method: 'DELETE'
        })
        .then(() => RefreshPostsList())
        .catch(error => console.error('Unable to update item.', error))
    })


});
