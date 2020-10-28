$(document).ready(function () {
    const uri = "api/Posts";

    $("#btnAdd").click(function () {
        fetch(uri, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Title: $("#txtTitle").val(),
                Text: $("#txtText").val(),
                IsPrivate: $("#checkIsPrivate").is(":checked") ? true : false,
                Author: $("#txtAuthor").val()
            })
        })
            .then(res => {
                return res.json();
            })
            .then(data => console.log(data))
            .then(ClearInputs())
            .catch(error => console.log(error));
    })

    $("#btnCancel").click(function () {
        ReturnToIndex();
    })

    function ReturnToIndex() {
        window.location = "index.html";
    }

    function ClearInputs() {
        $('#lblMessage').text(`The post: "${$("#txtTitle").val()}" was created`)
        $('input').val('');
    }
});
