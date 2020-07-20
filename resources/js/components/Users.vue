<template>
<div class="container">
    <div class="row mt-5">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">User table</h3>
                    <div class="card-tools">
                        <button class="btn btn-success" data-toggle="modal" data-target="#addNew">Add new <i class="fas fa-user-plus"></i></button>
                        <label for="check"> Close the form </label> <input v-model="check" type="checkbox" name="check" id="check">
                    </div>
                </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0" >
                <table class="table table-head-fixed text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users">
                      <td>{{user.id}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>
                      <td><span class="tag tag-success">{{user.type}}</span></td>
                      <td>
                          <a href="#">
                              <i class="fas fa-pen yellow"></i>
                              Modify
                          </a>
                          <a href="#">
                              <i class="fas fa-trash red"></i>
                              Delete
                          </a>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addNewLabel">Add new</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form @submit.prevent="createUser" id="myForm">
            <div class="modal-body">
                    <div class="form-group">
                    <input v-model="form.name" type="text" name="name" placeholder="Name"
                        class="form-control" :class="{ 'is-invalid': errors.name }">
                    <p class="red" v-if="errors.name">{{errors.name[0]}}</p>
                    <has-error :form="form" field="name">
                        
                    </has-error>
                    </div>

                    <div class="form-group">
                    <input v-model="form.email" type="email" name="email" placeholder="Email@example.com"
                        class="form-control" :class="{ 'is-invalid': errors.email }">
                    <p class="red" v-if="errors.email">{{errors.email[0]}}</p>
                    
                    <has-error :form="form" field="email">
                    </has-error>
                    </div>

                    <div class="form-group">
                    <textarea v-model="form.bio" id="bio" name="bio" placeholder="Short bio for user (Optional)"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                    <has-error :form="form" field="bio"></has-error>
                    </div>
                    <div class="form-group">
                    <select v-model="form.type" id="type" name="type"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">

                        <option value="">Select User Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="author">Author</option>
                    </select>
                    <has-error :form="form" field="type"></has-error>
                    </div>

                    <div class="form-group">
                    <input v-model="form.password" id="password" type="password" name="password" placeholder="Password"
                        class="form-control" :class="{ 'is-invalid': errors.password }">
                    <div v-if="errors.password">
                        <p class="red" v-for="error in errors.password">{{error}}</p>
                    </div>
                    
                    <has-error :form="form" field="password">
                        
                    </has-error>
                    </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="submit" :disabled="form.busy"  class="btn btn-primary">Create</button>
            </div>
            </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form: new Form({
                name: '',
                email: '',
                password: '',
                type: '',
                bio: '',
                photo: '',
            }),
            users: {},
            errors: {},
            check:true
        }
    },
    methods: {
        loadUsers(){
            axios.get("api/user").then(({data}) => (this.users = data.data))
        },
        createUser(){
            axios.post('api/user', this.form)
                .then((res) => {
                    if(res.status === 200){
                        this.loadUsers();
                        if(this.check){
                            $(function () {
                            
                            $('#addNew').modal('toggle'); // this for close the model
                            //$('#myForm')[0].reset(); // this for clear the form
                        });
                        }
                        
                        this.form.name = '';
                        this.form.email = '';
                        this.form.password = '';
                        this.form.bio = '';
                        this.form.type = '';
                        
                    }
                })
                .catch((error) => {
                    this.errors = error.response.data.errors
                })
        }
    },
    created(){
        this.loadUsers();
    }
}
</script>