<template>
  <div class="page">events page</div>
</template>

<script>
export default {
  mounted() {
    const token =
      "EAAsZBZAvS4DyYBAGa7oQm3F63QlcZACKqVQs7y7FaUaOv0TtHf4r0bHOs8KPrvZBJRZCv0DN3aIdFOOHJENo4ZCDhIy5wCNLQHbjJu14c72KmI5efa9fzNEdm8NHcdEYUnom0kVk0qabeh9SMcc7GzZAdLzkSv4tehx3tpicGLcPAxuZB5hAC02ec7mGq5cgjZC23X3ZAbZCv1QpwZDZD";
    const url = `https://graph.instagram.com/v13.0/uys.2000?fields=id,username&access_token=${token}`;
    fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    }).then((res) => {
      console.log(res);
      res.text();
    });
  },
};
</script>
